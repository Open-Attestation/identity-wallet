import {
  useEffect,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useRef
} from "react";
import { CheckStatus } from "../../../components/Validity";
import { checkValidity } from "../../../services/DocumentVerifier";
import { useConfigContext } from "../../../context/config";
import { VerificationFragmentStatus } from "@govtechsg/oa-verify";
import { VerifierTypes, OAWrappedDocument } from "../../../types";
import { isValid as ocIsValid } from "@govtechsg/opencerts-verify";

export interface VerificationStatuses {
  tamperedCheck: CheckStatus;
  issuedCheck: CheckStatus;
  revokedCheck: CheckStatus;
  issuerCheck: CheckStatus;
  overallValidity: CheckStatus;
}

export interface DocumentVerifier {
  statuses: VerificationStatuses;
  verify: (document: OAWrappedDocument) => void;
  issuerName: string;
}
export const handleVerificationFragment = (
  status: VerificationFragmentStatus,
  setStateFn: Dispatch<SetStateAction<CheckStatus>>
): void => {
  // This filters out unrecognised fragment statuses as INVALID
  if (Object.values(CheckStatus).includes(status as CheckStatus)) {
    setStateFn(status as CheckStatus);
  } else {
    setStateFn(CheckStatus.INVALID);
  }
};

export const useDocumentVerifier = (): DocumentVerifier => {
  const {
    config: { network, verifier }
  } = useConfigContext();

  const cancelled = useRef(false);
  const [tamperedCheck, setTamperedCheck] = useState(CheckStatus.CHECKING);
  const [issuedCheck, setIssuedCheck] = useState(CheckStatus.CHECKING);
  const [revokedCheck, setRevokedCheck] = useState(CheckStatus.CHECKING);
  const [issuerCheck, setIssuerCheck] = useState(CheckStatus.CHECKING);
  const [overallValidity, setOverallValidity] = useState(CheckStatus.CHECKING);
  const [issuerName, setIssuerName] = useState(CheckStatus.CHECKING);
  const isOpenCerts = verifier === VerifierTypes.OpenCerts;

  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
    };
  }, []);

  const verify = useCallback(
    async (document: OAWrappedDocument) => {
      setTamperedCheck(CheckStatus.CHECKING);
      setIssuedCheck(CheckStatus.CHECKING);
      setRevokedCheck(CheckStatus.CHECKING);
      setIssuerCheck(CheckStatus.CHECKING);
      setOverallValidity(CheckStatus.CHECKING);

      const isOverallValid = await checkValidity(
        document,
        network,
        verifier,
        ([verifyHash, verifyIssued, verifyRevoked, verifyIdentity]) => {
          verifyHash.then(({ status }) => {
            !cancelled.current &&
              handleVerificationFragment(status, setTamperedCheck);
          });
          verifyIssued.then(({ status }) => {
            !cancelled.current &&
              handleVerificationFragment(status, setIssuedCheck);
          });
          verifyRevoked.then(({ status }) => {
            !cancelled.current &&
              handleVerificationFragment(status, setRevokedCheck);
          });

          (verifyIdentity as Promise<any>).then(v => {
            setIssuerName(isOpenCerts ? v[v.length - 1].data[0].name : null);
            if (isOpenCerts) {
              !cancelled.current &&
                setIssuerCheck(
                  ocIsValid(v) ? CheckStatus.VALID : CheckStatus.INVALID
                );
            } else {
              !cancelled.current &&
                setIssuerCheck(
                  v.identifiedOnAll ? CheckStatus.VALID : CheckStatus.INVALID
                );
            }
          });
        },
        null //verify param not given
      );

      if (!cancelled.current) {
        setOverallValidity(
          isOverallValid ? CheckStatus.VALID : CheckStatus.INVALID
        );
      }
    },
    [isOpenCerts, network, verifier]
  );

  return {
    statuses: {
      tamperedCheck,
      issuedCheck,
      revokedCheck,
      issuerCheck,
      overallValidity
    },
    verify,
    issuerName
  };
};

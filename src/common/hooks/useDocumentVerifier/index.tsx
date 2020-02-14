import {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {CheckStatus} from "../../../components/Validity";
import {checkValidity} from "../../../services/DocumentVerifier";
import {useConfig} from "../useConfig";
import {VerificationFragmentStatus} from "@govtechsg/oa-verify";
import {OAWrappedDocument, VerifierTypes} from "../../../types";

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
}

export const handleVerificationFragment = (
  status: VerificationFragmentStatus,
  setStateFn: Dispatch<SetStateAction<CheckStatus>>
): void => {
  if (Object.values(CheckStatus).includes(status as CheckStatus)) {
    setStateFn(status as CheckStatus);
  } else {
    setStateFn(CheckStatus.ERROR);
  }
};

export const useDocumentVerifier = (): DocumentVerifier => {
  const {
    config: { network, verifier }
  } = useConfig();
  const cancelled = useRef(false);
  const [tamperedCheck, setTamperedCheck] = useState(CheckStatus.CHECKING);
  const [issuedCheck, setIssuedCheck] = useState(CheckStatus.CHECKING);
  const [revokedCheck, setRevokedCheck] = useState(CheckStatus.CHECKING);
  const [issuerCheck, setIssuerCheck] = useState(CheckStatus.CHECKING);
  const [overallValidity, setOverallValidity] = useState(CheckStatus.CHECKING);

  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
    };
  }, []);
  console.log({ verifierInMF: verifier, network });

  const verify = useCallback(
    async (document: OAWrappedDocument) => {
      setTamperedCheck(CheckStatus.CHECKING);
      setIssuedCheck(CheckStatus.CHECKING);
      setRevokedCheck(CheckStatus.CHECKING);
      setIssuerCheck(CheckStatus.CHECKING);
      setOverallValidity(CheckStatus.CHECKING);

      const overallValidityCheck = await checkValidity(
        document,
        network,
        VerifierTypes.OpenCerts,
        ([verifyHash, verifyIssued, verifyRevoked, verifyIdentity, oc]) => {
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
          Promise.all([
            verifyIdentity,
            oc || Promise.resolve({ status: "SKIPPED" })
          ]).then(([p1, p2]) => {
            !cancelled.current &&
              handleVerificationFragment(
                p1.status === "VALID" || p2.status === "VALID"
                  ? "VALID"
                  : "ERROR",
                setIssuerCheck
              );
          });
        }
      );

      if (!cancelled.current) {
        handleVerificationFragment(overallValidityCheck, setOverallValidity);
      }
    },
    [network, verifier]
  );

  return {
    statuses: {
      tamperedCheck,
      issuedCheck,
      revokedCheck,
      issuerCheck,
      overallValidity
    },
    verify
  };
};

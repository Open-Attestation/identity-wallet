import { useEffect, useCallback, useState, useRef } from "react";
import { CheckStatus } from "../../../components/Validity";
import { checkValidity } from "../../../services/DocumentVerifier";
import { useConfigContext } from "../../../context/config";
import { OAWrappedDocument, VerifierTypes } from "../../../types";

export interface VerificationStatuses {
  tamperedCheck: CheckStatus;
  issuedCheck: CheckStatus;
  revokedCheck: CheckStatus;
  identityCheck: CheckStatus;
  overallValidity: CheckStatus;
}

export interface DocumentVerifier {
  statuses: VerificationStatuses;
  verify: (document: OAWrappedDocument) => void;
  issuerName: string;
  verifierType: VerifierTypes;
}

export const useDocumentVerifier = (
  savedVerifierType?: VerifierTypes
): DocumentVerifier => {
  const {
    config: { network, verifier }
  } = useConfigContext();
  const verifierType = savedVerifierType ? savedVerifierType : verifier;

  const cancelled = useRef(false);
  const [tamperedCheck, setTamperedCheck] = useState(CheckStatus.CHECKING);
  const [issuedCheck, setIssuedCheck] = useState(CheckStatus.CHECKING);
  const [revokedCheck, setRevokedCheck] = useState(CheckStatus.CHECKING);
  const [identityCheck, setIdentityCheck] = useState(CheckStatus.CHECKING);
  const [overallValidity, setOverallValidity] = useState(CheckStatus.CHECKING);
  const [issuerName, setIssuerName] = useState("");

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
      setIdentityCheck(CheckStatus.CHECKING);
      setOverallValidity(CheckStatus.CHECKING);

      const isOverallValid = await checkValidity(
        document,
        network,
        verifierType,
        ([verifyHash, verifyIssued, verifyRevoked, verifyIdentity]) => {
          verifyHash.then(({ status }) => {
            !cancelled.current && setTamperedCheck(status);
          });
          verifyIssued.then(({ status }) => {
            !cancelled.current && setIssuedCheck(status);
          });
          verifyRevoked.then(({ status }) => {
            !cancelled.current && setRevokedCheck(status);
          });

          verifyIdentity.then(({ status, issuerName }) => {
            if (issuerName) {
              setIssuerName(issuerName);
            }

            !cancelled.current && setIdentityCheck(status);
          });
        }
      );

      if (!cancelled.current) {
        setOverallValidity(
          isOverallValid ? CheckStatus.VALID : CheckStatus.INVALID
        );
      }
    },
    [network, verifierType]
  );

  return {
    statuses: {
      tamperedCheck,
      issuedCheck,
      revokedCheck,
      identityCheck,
      overallValidity
    },
    verify,
    issuerName,
    verifierType
  };
};

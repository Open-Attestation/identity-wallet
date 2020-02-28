import { useEffect, useState } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { CheckStatus } from "../../../components/Validity";
import { checkValidity } from "../../../services/DocumentVerifier";
import { useConfigContext } from "../../../context/config";

export interface VerificationStatuses {
  tamperedCheck: CheckStatus;
  issuedCheck: CheckStatus;
  revokedCheck: CheckStatus;
  issuerCheck: CheckStatus;
  overallValidity: CheckStatus;
}

export const useDocumentVerifier = (
  document: WrappedDocument
): VerificationStatuses => {
  const {
    config: { network }
  } = useConfigContext();
  const [tamperedCheck, setTamperedCheck] = useState(CheckStatus.CHECKING);
  const [issuedCheck, setIssuedCheck] = useState(CheckStatus.CHECKING);
  const [revokedCheck, setRevokedCheck] = useState(CheckStatus.CHECKING);
  const [issuerCheck, setIssuerCheck] = useState(CheckStatus.CHECKING);
  const [overallValidity, setOverallValidity] = useState(CheckStatus.CHECKING);

  useEffect(() => {
    let cancelled = false;
    const [
      verifyHash,
      verifyIssued,
      verifyRevoked,
      verifyIdentity,
      overallValidityCheck
    ] = checkValidity(document, network);

    verifyHash.then(
      v =>
        !cancelled &&
        setTamperedCheck(
          v.checksumMatch ? CheckStatus.VALID : CheckStatus.INVALID
        )
    );
    verifyIssued.then(
      v =>
        !cancelled &&
        setIssuedCheck(v.issuedOnAll ? CheckStatus.VALID : CheckStatus.INVALID)
    );

    verifyRevoked.then(
      v =>
        !cancelled &&
        setRevokedCheck(
          v.revokedOnAny ? CheckStatus.INVALID : CheckStatus.VALID
        )
    );

    verifyIdentity.then(
      v =>
        !cancelled &&
        setIssuerCheck(
          v.identifiedOnAll ? CheckStatus.VALID : CheckStatus.INVALID
        )
    );

    overallValidityCheck.then(
      v =>
        !cancelled &&
        setOverallValidity(v ? CheckStatus.VALID : CheckStatus.INVALID)
    );

    return () => {
      cancelled = true;
    };
  }, [document, network]);

  return {
    tamperedCheck,
    issuedCheck,
    revokedCheck,
    issuerCheck,
    overallValidity
  };
};

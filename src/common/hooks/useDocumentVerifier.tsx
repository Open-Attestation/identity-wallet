import { useEffect, useState } from "react";
import { SignedDocument } from "@govtechsg/open-attestation";
import { checkValidity } from "../../services/DocumentVerifier";
import { CheckStatus } from "../../components/Validity";

export interface VerificationStatuses {
  tamperedCheck: CheckStatus;
  issuedCheck: CheckStatus;
  revokedCheck: CheckStatus;
  issuerCheck: CheckStatus;
  overallValidity: CheckStatus;
}

/**
 * Returns an object containing the statuses of the verification checks
 *
 * @param document
 * @param verificationStatuses (optional) If this props is present, skip verification checks
 */
export const useDocumentVerifier = (
  document: SignedDocument,
  verificationStatuses?: VerificationStatuses
): VerificationStatuses => {
  const [tamperedCheck, setTamperedCheck] = useState(
    verificationStatuses?.tamperedCheck || CheckStatus.CHECKING
  );
  const [issuedCheck, setIssuedCheck] = useState(
    verificationStatuses?.issuedCheck || CheckStatus.CHECKING
  );
  const [revokedCheck, setRevokedCheck] = useState(
    verificationStatuses?.revokedCheck || CheckStatus.CHECKING
  );
  const [issuerCheck, setIssuerCheck] = useState(
    verificationStatuses?.issuerCheck || CheckStatus.CHECKING
  );
  const [overallValidity, setOverallValidity] = useState(
    verificationStatuses?.overallValidity || CheckStatus.CHECKING
  );

  useEffect(() => {
    if (verificationStatuses) {
      return;
    }

    let cancelled = false;
    const [
      verifyHash,
      verifyIssued,
      verifyRevoked,
      verifyIdentity,
      overallValidityCheck
    ] = checkValidity(document);

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
  }, [document, verificationStatuses]);

  return {
    tamperedCheck,
    issuedCheck,
    revokedCheck,
    issuerCheck,
    overallValidity
  };
};

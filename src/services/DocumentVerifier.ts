import {
  openAttestationVerifiers,
  verificationBuilder,
  VerificationFragmentStatus,
  VerificationManagerOptions
} from "@govtechsg/oa-verify";
import { OAWrappedDocument, VerifierTypes } from "../types";
import { registryVerifier } from "@govtechsg/opencerts-verify";

const verifiers = [
  ...openAttestationVerifiers.slice(0, 2),
  ...openAttestationVerifiers.slice(3, 5)
];
const defaultVerify = verificationBuilder(verifiers);

export const checkValidity = async (
  document: OAWrappedDocument,
  network = "ropsten",
  verifier = VerifierTypes.OpenAttestation,
  promisesCallback: VerificationManagerOptions["promisesCallback"]
): Promise<VerificationFragmentStatus> => {
  console.log({ verifier });
  const v =
    verifier === VerifierTypes.OpenAttestation
      ? verifiers
      : [...verifiers, registryVerifier];

  console.log({ v });
  const verify = verificationBuilder(v);

  const overallResult = await verify(document, {
    network,
    promisesCallback
  });

  const statuses = overallResult.map(f => f.status);
  if (statuses.every(s => s === "VALID")) {
    return "VALID";
  } else if (statuses.some(s => s === "ERROR" || s === "SKIPPED")) {
    // none of the tests should skip
    return "ERROR";
  } else if (statuses.some(s => s === "INVALID")) {
    return "INVALID";
  }
  return "ERROR";
};

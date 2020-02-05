import {
  verificationBuilder,
  openAttestationVerifiers,
  VerificationManagerOptions,
  VerificationFragmentStatus
} from "@govtechsg/oa-verify";
import { OAWrappedDocument } from "../types";

const verifiers = [
  ...openAttestationVerifiers.slice(0, 2),
  ...openAttestationVerifiers.slice(3, 5)
];
const defaultVerify = verificationBuilder(verifiers);

export const checkValidity = async (
  document: OAWrappedDocument,
  network = "ropsten",
  promisesCallback: VerificationManagerOptions["promisesCallback"],
  verify = defaultVerify
): Promise<VerificationFragmentStatus> => {
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

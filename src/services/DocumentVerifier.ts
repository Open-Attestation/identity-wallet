import {
  verificationBuilder,
  openAttestationVerifiers,
  VerificationManagerOptions,
  isValid
} from "@govtechsg/oa-verify";
import { OAWrappedDocument } from "../types";

const verifiers = openAttestationVerifiers;
verifiers.splice(2, 1); // Remove openAttestationEthereumTokenRegistryMinted
const defaultVerify = verificationBuilder(verifiers);

export const checkValidity = async (
  document: OAWrappedDocument,
  network = "ropsten",
  promisesCallback: VerificationManagerOptions["promisesCallback"],
  verify = defaultVerify
): Promise<boolean> => {
  const overallResult = await verify(document, {
    network,
    promisesCallback
  });
  return isValid(overallResult);
};

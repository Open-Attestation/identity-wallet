import verify from "@govtechsg/oa-verify";
import { SignedDocument } from "@govtechsg/open-attestation";
import { checkValidIdentity } from "./IdentityVerifier";

export const checkValidity = (
  document: SignedDocument,
  network = "ropsten" // TODO: handle this based on some user selection of the network
): [
  ReturnType<typeof verify>,
  ReturnType<typeof checkValidIdentity>,
  Promise<boolean>
] => {
  const isMainnet = network === "mainnet";
  const networkName = isMainnet ? "homestead" : "ropsten";

  const verifyHashIssuedRevoked = verify(document, networkName);
  const verifyIdentity = checkValidIdentity(document, networkName);
  const overallValidity = Promise.all([
    verifyHashIssuedRevoked,
    verifyIdentity
  ]).then(([{ valid }, { identifiedOnAll }]) => valid && identifiedOnAll);

  return [verifyHashIssuedRevoked, verifyIdentity, overallValidity];
};

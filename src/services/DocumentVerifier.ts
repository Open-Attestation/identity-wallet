import {
  verificationBuilder,
  openAttestationVerifiers
} from "@govtechsg/oa-verify";
import { v2, WrappedDocument } from "@govtechsg/open-attestation";

// Ensures TS infers the type of the array as a tuple instead
// https://github.com/Microsoft/TypeScript/pull/24897
// function tuple<T extends any[]>(...data: T): T {
//   return data;
// }

// Let TS infer the return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const checkValidity = async (
  document: WrappedDocument<v2.OpenAttestationDocument>,
  network = "ropsten", // TODO: handle this based on some user selection of the network,
  callback
) => {
  const isMainnet = network === "mainnet";
  const networkName = isMainnet ? "homestead" : "ropsten";

  const verify = verificationBuilder(openAttestationVerifiers);

  const [
    verifyHash,
    ,
    verifyIssued,
    verifyRevoked,
    verifyIdentity
  ] = await verify(document, {
    network: networkName,
    promisesCallback: callback
  });

  // If any of the checks are invalid, resolve the overall validity early
  const overallValidityCheck = Promise.all([
    new Promise(async (resolve, reject) =>
      (await verifyHash).verify ? resolve() : reject()
    ),
    new Promise(async (resolve, reject) =>
      (await verifyIssued).verify ? resolve() : reject()
    ),
    new Promise(async (resolve, reject) =>
      (await verifyRevoked).verify ? reject() : resolve()
    ),
    new Promise(async (resolve, reject) =>
      (await verifyIdentity).verify ? resolve() : reject()
    )
  ])
    .then(() => true)
    .catch(() => false);

  return tuple(
    verifyHash,
    verifyIssued,
    verifyRevoked,
    verifyIdentity,
    overallValidityCheck
  );
};

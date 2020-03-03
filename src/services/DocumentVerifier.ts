// FIX - error triggering when runnning tests.
// console.log('There was an error in DocumentVerifier.js');

// Also verify param is only used for testing. is that correct?

import {
  openAttestationVerifiers,
  VerificationFragment,
  VerificationManagerOptions
} from "@govtechsg/oa-verify";
import {
  verify as ocVerify,
  isValid as ocIsValid
} from "@govtechsg/opencerts-verify";
import { OAWrappedDocument, VerifierTypes } from "../types";
import { checkValidIdentity } from "./IdentityVerifier";
import { CheckStatus } from "../components/Validity";

export interface OaVerifyIdentity {
  identifiedOnAll: boolean;
  details: [];
}

// Let TS infer the return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const checkValidity = (
  document: OAWrappedDocument,
  network = "ropsten", // TODO: handle this based on some user selection of the network
  verifier: VerifierTypes,
  promisesCallback: VerificationManagerOptions["promisesCallback"],
  verify // only used when testing
) => {
  if (verify) {
    // fix.
    console.log("verify was given as param", verify);

    const overallResult = Promise.all(
      verify.map(check => {
        new Promise(async (resolve, reject) =>
          check.status === CheckStatus.VALID ? resolve() : reject()
        );
      })
    )
      .then(() => true)
      .catch(() => false);
    return overallResult;
  }

  //set up verifiers
  const isMainnet = network === "mainnet";
  const networkName = isMainnet ? "homestead" : "ropsten";
  const isOpenCerts = verifier === VerifierTypes.OpenCerts;

  const verifyHash = openAttestationVerifiers[0].verify(
    document as OAWrappedDocument,
    { network: networkName }
  );
  const verifyIssued = openAttestationVerifiers[1].verify(
    document as OAWrappedDocument,
    { network: networkName }
  );
  const verifyRevoked = openAttestationVerifiers[3].verify(
    document as OAWrappedDocument,
    { network: networkName }
  );

  const verifyIdentity = isOpenCerts
    ? ocVerify(document, { network })
    : checkValidIdentity(document, networkName);

  promisesCallback!([
    verifyHash,
    verifyIssued,
    verifyRevoked,
    verifyIdentity as any
  ]);

  const verifyIdentityCheck = isOpenCerts
    ? new Promise(async (resolve, reject) =>
        ocIsValid((await verifyIdentity) as VerificationFragment<any>[])
          ? resolve()
          : reject()
      )
    : new Promise(async (resolve, reject) =>
        ((await verifyIdentity) as OaVerifyIdentity).identifiedOnAll
          ? resolve()
          : reject()
      );

  // If any of the checks are invalid, resolve the overall validity early
  const overallResult = Promise.all([
    new Promise(async (resolve, reject) =>
      (await verifyHash).status === CheckStatus.VALID ? resolve() : reject()
    ),
    new Promise(async (resolve, reject) =>
      (await verifyIssued).status === CheckStatus.VALID ? resolve() : reject()
    ),
    new Promise(async (resolve, reject) =>
      (await verifyRevoked).status === CheckStatus.VALID ? resolve() : reject()
    ),
    verifyIdentityCheck
  ])
    .then(() => true)
    .catch(err => {
      console.log("There was an error in DocumentVerifier.js");
      return false;
    });

  return overallResult;
};

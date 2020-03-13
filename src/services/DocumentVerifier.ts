import {
  openAttestationVerifiers,
  VerificationFragment,
  VerificationManagerOptions
} from "@govtechsg/oa-verify";
import {
  isValid as ocIsValid,
  verify as ocVerify
} from "@govtechsg/opencerts-verify";
import { NetworkTypes, OAWrappedDocument, VerifierTypes } from "../types";
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
  network: NetworkTypes = NetworkTypes.ropsten,
  verifier: VerifierTypes,
  // type will be different, you will return Promise only with a status which is VALID or INVALID
  promisesCallback: NonNullable<VerificationManagerOptions["promisesCallback"]>
) => {
  //set up verifiers
  // TODO why do we need to transform mainnet to homestead ? why not using homestead in the enum
  const networkName =
    network === NetworkTypes.mainnet ? "homestead" : "ropsten";
  const isOpenCerts = verifier === VerifierTypes.OpenCerts;

  // TODO open an issue on oa-verify, to export each verifier individually, then here we can reuse the verifier
  const verifyHash = openAttestationVerifiers[0].verify(
    document as OAWrappedDocument,
    { network: networkName }
  );
  // TODO example on how to handle it in this file
  // .then(({ status }) => (status === "VALID" ? "VALID" : "INVALID"));
  // you can also use isValid for DOCUMENT_STATUS type
  const verifyIssued = openAttestationVerifiers[1].verify(
    document as OAWrappedDocument,
    { network: networkName }
  );
  const verifyRevoked = openAttestationVerifiers[3].verify(
    document as OAWrappedDocument,
    { network: networkName }
  );

  // TODO remove this checkValidIdentity, can use dns verifier directly
  /***
   * if it's opencerts
   * Promise.all([verifierForDns, verifierForRegistry]).then((fragments) => ocIsValid(fragments, "ISSUER_IDENTITY") and then transform like above
   * else
   * Promise.all([verifierForDns]) // then same as above, but use isValid form oa-verify and then you transform
   *
   */
  const verifyIdentity = isOpenCerts
    ? ocVerify(document, { network }) // this run all verification
    : checkValidIdentity(document, networkName); // this run only one :)

  // I would keep this like it is now
  // but I would provide an object with a status only, status being VALID or INVALID only
  // that mean that we need to listen to the promise and transform the result
  promisesCallback([
    verifyHash,
    verifyIssued,
    verifyRevoked,
    verifyIdentity // TODO this is not correct, type is wrong which could be an issue for the consumer
  ]);

  // TODO this is not completely correct =)
  //
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
  return Promise.all([
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
      console.log("There was an error in DocumentVerifier.js", err);
      return false;
    });
};

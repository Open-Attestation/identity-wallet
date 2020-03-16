import {
  openAttestationHash,
  openAttestationEthereumDocumentStoreIssued,
  openAttestationEthereumDocumentStoreRevoked,
  openAttestationDnsTxt,
} from '@govtechsg/oa-verify';
import {
  isValid as ocIsValid,
  registryVerifier,
} from '@govtechsg/opencerts-verify';
import { NetworkTypes, OAWrappedDocument, VerifierTypes } from '../types';
import { CheckStatus } from '../components/Validity';

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
  promisesCallback: (
    statuses: Promise<{ status: CheckStatus; issuerName?: string }>[],
  ) => void,
) => {
  // TODO why do we need to transform mainnet to homestead ? why not using homestead in the enum
  const networkName =
    network === NetworkTypes.mainnet ? 'homestead' : 'ropsten';
  const isOpenCerts = verifier === VerifierTypes.OpenCerts;

  // TODO open an issue on oa-verify, to export each verifier individually, then here we can reuse the verifier
  const verifyHash = openAttestationHash
    .verify(document as OAWrappedDocument, { network: networkName })
    .then(({ status }) =>
      status === CheckStatus.VALID
        ? { status: CheckStatus.VALID }
        : { status: CheckStatus.INVALID },
    );

  const verifyIssued = openAttestationEthereumDocumentStoreIssued
    .verify(document as OAWrappedDocument, { network: networkName })
    .then(({ status }) =>
      status === CheckStatus.VALID
        ? { status: CheckStatus.VALID }
        : { status: CheckStatus.INVALID },
    );
  const verifyRevoked = openAttestationEthereumDocumentStoreRevoked
    .verify(document as OAWrappedDocument, { network: networkName })
    .then(({ status }) =>
      status === CheckStatus.VALID
        ? { status: CheckStatus.VALID }
        : { status: CheckStatus.INVALID },
    );

  const verifyIdentity = isOpenCerts
    ? Promise.all([
        openAttestationDnsTxt.verify(document as OAWrappedDocument, {
          network: networkName,
        }),
        registryVerifier.verify(document as OAWrappedDocument, {
          network: networkName,
        }),
      ]).then(fragments => {
        const issuerName = fragments[fragments.length - 1].data[0].name;
        return ocIsValid(fragments as any, ['ISSUER_IDENTITY'])
          ? { status: CheckStatus.VALID, issuerName }
          : {
              status: CheckStatus.INVALID,
              issuerName,
            };
      })
    : openAttestationDnsTxt
        .verify(document as OAWrappedDocument, { network: networkName })
        .then(({ status }) =>
          status === CheckStatus.VALID
            ? { status: CheckStatus.VALID }
            : { status: CheckStatus.INVALID },
        );

  promisesCallback([verifyHash, verifyIssued, verifyRevoked, verifyIdentity]);

  // If any of the checks are invalid, resolve the overall validity early
  return Promise.all([
    new Promise(async (resolve, reject) =>
      (await verifyHash).status === CheckStatus.VALID ? resolve() : reject(),
    ),
    new Promise(async (resolve, reject) =>
      (await verifyIssued).status === CheckStatus.VALID ? resolve() : reject(),
    ),
    new Promise(async (resolve, reject) =>
      (await verifyRevoked).status === CheckStatus.VALID ? resolve() : reject(),
    ),
    new Promise(async (resolve, reject) =>
      (await verifyIdentity).status === CheckStatus.VALID
        ? resolve()
        : reject(),
    ),
  ])
    .then(() => true)
    .catch(err => {
      console.log('There was an error in DocumentVerifier.js', err);
      return false;
    });
};

import {
  isValid,
  openAttestationDnsTxt,
  openAttestationEthereumDocumentStoreIssued,
  openAttestationEthereumDocumentStoreRevoked,
  openAttestationEthereumTokenRegistryMinted,
  openAttestationHash,
  verificationBuilder,
  VerificationFragment,
  Identity
} from "@govtechsg/oa-verify";
import {
  isValid as ocIsValid,
  registryVerifier,
  RegistryEntry
} from "@govtechsg/opencerts-verify";
import { NetworkTypes, OAWrappedDocument, VerifierTypes } from "../types";
import { CheckStatus } from "../components/Validity";
import { fakeTokenRegistryRevoked } from "./fakeTokenRegistryRevoked";

const documentStatusVerifier = verificationBuilder([openAttestationHash]);
const documentIssuedVerifier = verificationBuilder([
  openAttestationEthereumDocumentStoreIssued,
  openAttestationEthereumTokenRegistryMinted
]);
const documentRevokedVerifier = verificationBuilder([
  openAttestationEthereumDocumentStoreRevoked,
  fakeTokenRegistryRevoked
]);
const openAttestationIssuerIdentityVerifier = verificationBuilder([
  openAttestationDnsTxt
]);
const openCertsIssuerIdentityVerifier = verificationBuilder([
  openAttestationDnsTxt,
  registryVerifier
]);

type OpencertsRegistryVerificationFragmentData = Partial<RegistryEntry> & {
  value: string;
  status: "VALID" | "INVALID";
};

const getIssuerNameFromRegistryFragment = (
  dnsFragment: VerificationFragment<Identity | Identity[]>,
  registryFragment?: VerificationFragment<
    | OpencertsRegistryVerificationFragmentData
    | OpencertsRegistryVerificationFragmentData[]
  >
): string => {
  // find location from registry fragment if available
  if (registryFragment) {
    const registryVerifierFragmentData = Array.isArray(registryFragment.data)
      ? registryFragment.data
      : registryFragment.data // not an array and is defined => make it an array
      ? [registryFragment.data]
      : []; // otherwise return empty array
    // using concat to handle arrays and single element
    const registryIdentity = registryVerifierFragmentData.find(
      ({ status }) => status === "VALID"
    );
    if (registryIdentity && registryIdentity.name) {
      return registryIdentity.name;
    }
  }

  // find location from dns fragment
  const dnsTxtVerifierFragmentData = Array.isArray(dnsFragment.data)
    ? dnsFragment.data
    : dnsFragment.data // not an array and is defined => make it an array
    ? [dnsFragment.data]
    : []; // otherwise return empty array
  const dnsIdentity = dnsTxtVerifierFragmentData
    .sort((obj1, obj2) =>
      (obj1.location || "").localeCompare(obj2.location || "")
    )
    .find(({ status }) => status === "VALID");
  if (dnsIdentity && dnsIdentity.location) {
    return dnsIdentity.location;
  }
  return "Issuer's identity not found"; // this should never happen ? :)
};

// Let TS infer the return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const checkValidity = (
  document: OAWrappedDocument,
  network: NetworkTypes = NetworkTypes.ropsten,
  verifier: VerifierTypes,
  promisesCallback: (
    statuses: Promise<{ status: CheckStatus; issuerName?: string }>[]
  ) => void
) => {
  // TODO why do we need to transform mainnet to homestead ? why not using homestead in the enum
  const networkName =
    network === NetworkTypes.mainnet ? "homestead" : "ropsten";
  const isOpenCerts = verifier === VerifierTypes.OpenCerts;

  // TODO open an issue on oa-verify, to export each verifier individually, then here we can reuse the verifier
  const verifyHash = documentStatusVerifier(document as OAWrappedDocument, {
    network: networkName
  }).then(fragments => ({
    status: isValid(fragments, ["DOCUMENT_INTEGRITY"])
      ? CheckStatus.VALID
      : CheckStatus.INVALID
  }));

  const verifyIssued = documentIssuedVerifier(document as OAWrappedDocument, {
    network: networkName
  }).then(fragments => ({
    status: isValid(fragments, ["DOCUMENT_STATUS"])
      ? CheckStatus.VALID
      : CheckStatus.INVALID
  }));

  const verifyRevoked = documentRevokedVerifier(document as OAWrappedDocument, {
    network: networkName
  }).then(fragments => ({
    status: isValid(fragments, ["DOCUMENT_STATUS"])
      ? CheckStatus.VALID
      : CheckStatus.INVALID
  }));

  const verifyIdentity = isOpenCerts
    ? openCertsIssuerIdentityVerifier(document as OAWrappedDocument, {
        network: networkName
      }).then(([dnsTextFragment, registryFragment]) => {
        const issuerName = getIssuerNameFromRegistryFragment(
          dnsTextFragment,
          registryFragment
        );
        return {
          status: ocIsValid(
            [dnsTextFragment, registryFragment],
            ["ISSUER_IDENTITY"]
          )
            ? CheckStatus.VALID
            : CheckStatus.INVALID,
          issuerName
        };
      })
    : openAttestationIssuerIdentityVerifier(document as OAWrappedDocument, {
        network: networkName
      }).then(dnsTextFragment => {
        const issuerName = getIssuerNameFromRegistryFragment(
          dnsTextFragment[0]
        );
        return {
          status: isValid(dnsTextFragment, ["ISSUER_IDENTITY"])
            ? CheckStatus.VALID
            : CheckStatus.INVALID,
          issuerName
        };
      });

  promisesCallback([verifyHash, verifyIssued, verifyRevoked, verifyIdentity]);

  // If any of the checks are invalid, resolve the overall validity early
  return Promise.all([
    new Promise(async (resolve, reject) =>
      (await verifyHash).status === CheckStatus.VALID
        ? resolve()
        : reject("verifyHash has failed")
    ),
    new Promise(async (resolve, reject) =>
      (await verifyIssued).status === CheckStatus.VALID
        ? resolve()
        : reject("verifyIssued has failed")
    ),
    new Promise(async (resolve, reject) =>
      (await verifyRevoked).status === CheckStatus.VALID
        ? resolve()
        : reject("verifyRevoked has failed")
    ),
    new Promise(async (resolve, reject) =>
      (await verifyIdentity).status === CheckStatus.VALID
        ? resolve()
        : reject("verifyIdentity has failed")
    )
  ])
    .then(() => true)
    .catch(err => {
      console.log("There was an error in DocumentVerifier.js", err);
      return false;
    });
};

import { Verifier } from "@govtechsg/oa-verify";
import {
  utils,
  getData,
  v2,
  v3,
  WrappedDocument
} from "@govtechsg/open-attestation";

// this is a fake revoke verification method for token registry that will
// - return valid if the document uses token registry
// - return skipped otherwise
const name = "FakeTokenRegistryRevoked";
const type = "DOCUMENT_STATUS";
export const fakeTokenRegistryRevoked: Verifier<
  | WrappedDocument<v2.OpenAttestationDocument>
  | WrappedDocument<v3.OpenAttestationDocument>
> = {
  skip: () => {
    return Promise.resolve({
      status: "SKIPPED",
      type,
      name,
      reason: {
        code: 0,
        codeString: "SKIPPED",
        message: `Document issuers doesn't have "tokenRegistry" property or ${v3.Method.TokenRegistry} method`
      }
    });
  },
  test: document => {
    if (utils.isWrappedV3Document(document)) {
      const documentData = getData(document);
      return documentData.proof.method === v3.Method.TokenRegistry;
    }
    const documentData = getData(document);
    return documentData.issuers.every(issuer => "tokenRegistry" in issuer);
  },
  verify: async (document, options) => {
    return {
      name,
      type,
      data: {
        revokedOnAny: false
      },
      status: "VALID"
    };
  }
};

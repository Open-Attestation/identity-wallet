import { checkValidity } from "./DocumentVerifier";
import { NetworkTypes, OAWrappedDocument, VerifierTypes } from "../types";

const mockIsValid = jest.fn();

jest.mock("@govtechsg/oa-verify", () => {
  return {
    openAttestationHash: jest.fn(),
    openAttestationEthereumDocumentStoreIssued: jest.fn(),
    openAttestationEthereumDocumentStoreRevoked: jest.fn(),
    openAttestationDnsTxt: jest.fn(),
    isValid: () => mockIsValid(),
    verificationBuilder: () => () => Promise.resolve([{}, {}]) // return 2 elements for identity fragment resolution
  };
});

// TODO this is vry complicated to test using mock, we might consider to replace using e2e tests
describe("DocumentVerifier", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("checkValidity", () => {
    it("should return true when all checks are valid", async () => {
      expect.assertions(1);
      mockIsValid.mockReturnValue(true);

      const result = await checkValidity(
        {} as OAWrappedDocument,
        NetworkTypes.ropsten,
        VerifierTypes.OpenAttestation,
        jest.fn()
      );
      expect(result).toBe(true);
    });
    it("should return false when somes checks errored", async () => {
      expect.assertions(1);
      mockIsValid.mockReturnValue(false);

      const result = await checkValidity(
        {} as OAWrappedDocument,
        NetworkTypes.ropsten,
        VerifierTypes.OpenAttestation,
        jest.fn()
      );
      expect(result).toBe(false);
    });
  });
});

import { checkValidity } from "./DocumentVerifier";
import { OAWrappedDocument } from "../types";

const mockOpenAttestationHash = jest.fn();
const mockOpenAttestationEthereumDocumentStoreIssued = jest.fn();
const mockOpenAttestationEthereumDocumentStoreRevoked = jest.fn();
const mockOpenAttestationDnsTxt = jest.fn();
jest.mock("@govtechsg/oa-verify", () => {
  return {
    openAttestationHash: {
      verify: () => {
        return mockOpenAttestationHash();
      }
    },
    openAttestationEthereumDocumentStoreIssued: {
      verify: () => {
        return mockOpenAttestationEthereumDocumentStoreIssued();
      }
    },
    openAttestationEthereumDocumentStoreRevoked: {
      verify: () => {
        return mockOpenAttestationEthereumDocumentStoreRevoked();
      }
    },
    openAttestationDnsTxt: {
      verify: () => {
        return mockOpenAttestationDnsTxt();
      }
    }
  };
});

describe("DocumentVerifier", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("checkValidity", () => {
    it("should return true when all checks are valid", async () => {
      expect.assertions(1);
      mockOpenAttestationHash.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreIssued.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreRevoked.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationDnsTxt.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );

      const result = await checkValidity(
        {} as OAWrappedDocument,
        "ropsten",
        "OpenAttestation",
        jest.fn()
      );
      expect(result).toBe(true);
    });
    it("should return false when somes checks errored", async () => {
      expect.assertions(1);
      mockOpenAttestationHash.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreIssued.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreRevoked.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationDnsTxt.mockResolvedValue(
        Promise.resolve({ status: "ERROR" })
      );

      const result = await checkValidity(
        {} as OAWrappedDocument,
        "ropsten",
        "OpenAttestation",
        jest.fn()
      );
      expect(result).toBe(false);
    });

    it("should return false when somes checks skipped", async () => {
      expect.assertions(1);
      mockOpenAttestationHash.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreIssued.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreRevoked.mockResolvedValue(
        Promise.resolve({ status: "SKIPPED" })
      );
      mockOpenAttestationDnsTxt.mockResolvedValue(
        Promise.resolve({ status: "SKIPPED" })
      );

      const result = await checkValidity(
        {} as OAWrappedDocument,
        "ropsten",
        "OpenAttestation",
        jest.fn()
      );
      expect(result).toBe(false);
    });

    it("should return false when somes checks are invalid", async () => {
      expect.assertions(1);
      mockOpenAttestationHash.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreIssued.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreRevoked.mockResolvedValue(
        Promise.resolve({ status: "INVALID" })
      );
      mockOpenAttestationDnsTxt.mockResolvedValue(
        Promise.resolve({ status: "INVALID" })
      );

      const result = await checkValidity(
        {} as OAWrappedDocument,
        "ropsten",
        "OpenAttestation",
        jest.fn()
      );
      expect(result).toBe(false);
    });

    it("should return false when somes checks are invalid and some have errored", async () => {
      expect.assertions(1);
      mockOpenAttestationHash.mockResolvedValue(
        Promise.resolve({ status: "VALID" })
      );
      mockOpenAttestationEthereumDocumentStoreIssued.mockResolvedValue(
        Promise.resolve({ status: "INVALID" })
      );
      mockOpenAttestationEthereumDocumentStoreRevoked.mockResolvedValue(
        Promise.resolve({ status: "INVALID" })
      );
      mockOpenAttestationDnsTxt.mockResolvedValue(
        Promise.resolve({ status: "ERROR" })
      );

      const result = await checkValidity(
        {} as OAWrappedDocument,
        "ropsten",
        "OpenAttestation",
        jest.fn()
      );
      expect(result).toBe(false);
    });
  });
});

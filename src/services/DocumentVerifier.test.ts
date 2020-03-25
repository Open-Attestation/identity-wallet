import { checkValidity } from "./DocumentVerifier";
import { NetworkTypes, VerifierTypes } from "../types";
import demoCaas from "../../fixtures/demo-caas.json";
import demoCaasTempered from "../../fixtures/demo-caas-tempered.json";

describe("DocumentVerifier", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("checkValidity", () => {
    it("should return true when all checks are valid", async () => {
      expect.assertions(1);

      const result = await checkValidity(
        demoCaas as any,
        NetworkTypes.ropsten,
        VerifierTypes.OpenAttestation,
        jest.fn()
      );
      expect(result).toBe(true);
    });
    it("should return false when somes checks errored", async () => {
      expect.assertions(1);

      const result = await checkValidity(
        demoCaasTempered as any,
        NetworkTypes.ropsten,
        VerifierTypes.OpenAttestation,
        jest.fn()
      );
      expect(result).toBe(false);
    });
  });
});

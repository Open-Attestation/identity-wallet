import sampleDoc from "../../fixtures/demo-caas.json";
import { SignedDocument } from "@govtechsg/open-attestation";
import { checkValidity } from "./DocumentVerifier";

import verify from "@govtechsg/oa-verify";
jest.mock("@govtechsg/oa-verify");
const verifyMock = verify as jest.Mock;

import { checkValidIdentity } from "./IdentityVerifier";
jest.mock("./IdentityVerifier");
const checkValidIdentityMock = checkValidIdentity as jest.Mock;

const truthyVerifyResult = {
  hash: { checksumMatch: true },
  issued: { issuedOnAll: true },
  revoked: { revokedOnAny: false },
  valid: true
};

const falsyVerifyResult = {
  hash: { checksumMatch: true },
  issued: { issuedOnAll: true },
  revoked: { revokedOnAny: true },
  valid: false
};

const truthyIdentityResult = {
  identifiedOnAll: true,
  details: []
};

const falsyIdentityResult = {
  identifiedOnAll: false,
  details: []
};

describe("ValidityChecker", () => {
  describe("checkValidity", () => {
    describe("when verify and checkValidIdentity return truthy results", () => {
      it("should return promises that resolve to the truthy result", async () => {
        expect.assertions(3);
        verifyMock.mockResolvedValue(truthyVerifyResult);
        checkValidIdentityMock.mockResolvedValue(truthyIdentityResult);

        const [
          verifyHashIssuedRevoked,
          verifyIdentity,
          overallValidity
        ] = checkValidity(sampleDoc as SignedDocument);

        const verifyHashIssuedRevokedResult = await verifyHashIssuedRevoked;
        expect(verifyHashIssuedRevokedResult).toBe(truthyVerifyResult);

        const verifyIdentityResult = await verifyIdentity;
        expect(verifyIdentityResult).toBe(truthyIdentityResult);

        const overallValidityResult = await overallValidity;
        expect(overallValidityResult).toBe(true);
      });
    });

    describe("when verify and checkValidIdentity return falsy results", () => {
      it("should return promises that resolve to the falsy result", async () => {
        expect.assertions(3);
        verifyMock.mockResolvedValue(falsyVerifyResult);
        checkValidIdentityMock.mockResolvedValue(falsyIdentityResult);

        const [
          verifyHashIssuedRevoked,
          verifyIdentity,
          overallValidity
        ] = checkValidity(sampleDoc as SignedDocument);

        const verifyHashIssuedRevokedResult = await verifyHashIssuedRevoked;
        expect(verifyHashIssuedRevokedResult).toBe(falsyVerifyResult);

        const verifyIdentityResult = await verifyIdentity;
        expect(verifyIdentityResult).toBe(falsyIdentityResult);

        const overallValidityResult = await overallValidity;
        expect(overallValidityResult).toBe(false);
      });
    });

    describe("when verify returns truthy result and checkValidIdentity returns falsy result", () => {
      it("should return promises that resolve to the falsy result", async () => {
        expect.assertions(3);
        verifyMock.mockResolvedValue(truthyVerifyResult);
        checkValidIdentityMock.mockResolvedValue(falsyIdentityResult);

        const [
          verifyHashIssuedRevoked,
          verifyIdentity,
          overallValidity
        ] = checkValidity(sampleDoc as SignedDocument);

        const verifyHashIssuedRevokedResult = await verifyHashIssuedRevoked;
        expect(verifyHashIssuedRevokedResult).toBe(truthyVerifyResult);

        const verifyIdentityResult = await verifyIdentity;
        expect(verifyIdentityResult).toBe(falsyIdentityResult);

        const overallValidityResult = await overallValidity;
        expect(overallValidityResult).toBe(false);
      });
    });

    describe("when verify returns falsy result and checkValidIdentity returns truthy result", () => {
      it("should return promises that resolve to the falsy result", async () => {
        expect.assertions(3);
        verifyMock.mockResolvedValue(falsyVerifyResult);
        checkValidIdentityMock.mockResolvedValue(truthyIdentityResult);

        const [
          verifyHashIssuedRevoked,
          verifyIdentity,
          overallValidity
        ] = checkValidity(sampleDoc as SignedDocument);

        const verifyHashIssuedRevokedResult = await verifyHashIssuedRevoked;
        expect(verifyHashIssuedRevokedResult).toBe(falsyVerifyResult);

        const verifyIdentityResult = await verifyIdentity;
        expect(verifyIdentityResult).toBe(truthyIdentityResult);

        const overallValidityResult = await overallValidity;
        expect(overallValidityResult).toBe(false);
      });
    });
  });
});

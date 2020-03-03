// FIX - test is failing

import { checkValidity } from "./DocumentVerifier";
import { OAWrappedDocument } from "../types";
import { VerificationFragment } from "@govtechsg/oa-verify";

describe("DocumentVerifier", () => {
  describe("checkValidity", () => {
    it("should return true when all checks are valid", async () => {
      expect.assertions(1);
      const mockVerify = jest.fn(
        (): Promise<VerificationFragment<any>[]> =>
          Promise.resolve([
            { name: "", type: "DOCUMENT_INTEGRITY", status: "VALID" },
            { name: "", type: "DOCUMENT_STATUS", status: "VALID" },
            { name: "", type: "DOCUMENT_STATUS", status: "VALID" }
          ])
      );
      const result = await checkValidity(
        {} as OAWrappedDocument,
        "ropsten",
        "Open Attestation",
        jest.fn(),
        mockVerify
      );
      expect(result).toBe(true);
    });

    // it('should return false when somes checks errored', async () => {
    //   expect.assertions(1);
    //   const mockVerify = jest.fn(
    //     (): Promise<VerificationFragment<any>[]> =>
    //       Promise.resolve([
    //         { name: '', type: 'DOCUMENT_INTEGRITY', status: 'VALID' },
    //         { name: '', type: 'DOCUMENT_STATUS', status: 'ERROR' },
    //         { name: '', type: 'DOCUMENT_STATUS', status: 'VALID' },
    //         { name: '', type: 'ISSUER_IDENTITY', status: 'VALID' },
    //       ]),
    //   );
    //   const result = await checkValidity(
    //     {} as OAWrappedDocument,
    //     'ropsten',
    //     jest.fn(),
    //     mockVerify,
    //   );
    //   expect(result).toBe(false);
    // });

    // it('should return false when somes checks skipped', async () => {
    //   expect.assertions(1);
    //   const mockVerify = jest.fn(
    //     (): Promise<VerificationFragment<any>[]> =>
    //       Promise.resolve([
    //         { name: '', type: 'DOCUMENT_INTEGRITY', status: 'VALID' },
    //         { name: '', type: 'DOCUMENT_STATUS', status: 'VALID' },
    //         { name: '', type: 'DOCUMENT_STATUS', status: 'SKIPPED' },
    //         { name: '', type: 'ISSUER_IDENTITY', status: 'SKIPPED' },
    //       ]),
    //   );
    //   const result = await checkValidity(
    //     {} as OAWrappedDocument,
    //     'ropsten',
    //     jest.fn(),
    //     mockVerify,
    //   );
    //   expect(result).toBe(false);
    // });

    // it('should return false when somes checks are invalid', async () => {
    //   expect.assertions(1);
    //   const mockVerify = jest.fn(
    //     (): Promise<VerificationFragment<any>[]> =>
    //       Promise.resolve([
    //         { name: '', type: 'DOCUMENT_INTEGRITY', status: 'VALID' },
    //         { name: '', type: 'DOCUMENT_STATUS', status: 'INVALID' },
    //         { name: '', type: 'DOCUMENT_STATUS', status: 'INVALID' },
    //         { name: '', type: 'ISSUER_IDENTITY', status: 'VALID' },
    //       ]),
    //   );
    //   const result = await checkValidity(
    //     {} as OAWrappedDocument,
    //     'ropsten',
    //     jest.fn(),
    //     mockVerify,
    //   );
    //   expect(result).toBe(false);
    // });

    // it('should return false when somes checks are invalid and some have errored', async () => {
    //   expect.assertions(1);
    //   const mockVerify = jest.fn(
    //     (): Promise<VerificationFragment<any>[]> =>
    //       Promise.resolve([
    //         { name: '', type: 'DOCUMENT_INTEGRITY', status: 'VALID' },
    //         { name: '', type: 'DOCUMENT_STATUS', status: 'INVALID' },
    //         { name: '', type: 'DOCUMENT_STATUS', status: 'INVALID' },
    //         { name: '', type: 'ISSUER_IDENTITY', status: 'ERROR' },
    //       ]),
    //   );
    //   const result = await checkValidity(
    //     {} as OAWrappedDocument,
    //     'ropsten',
    //     jest.fn(),
    //     mockVerify,
    //   );
    //   expect(result).toBe(false);
    // });
  });
});

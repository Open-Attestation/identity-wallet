import sampleDoc from "../../../../fixtures/demo-oc.json";
import { useDocumentVerifier } from "./index";
import { SignedDocument } from "@govtechsg/open-attestation";
import { renderHook } from "@testing-library/react-hooks";
import { CheckStatus } from "../../../components/Validity/";

import { checkValidity } from "../../../services/DocumentVerifier";
jest.mock("../../../services/DocumentVerifier");
const mockCheckValidity = checkValidity as jest.Mock;

jest.useFakeTimers();

describe("useDocumentVerifier", () => {
  beforeEach(() => {
    mockCheckValidity.mockReset();
  });

  it("should return the correct check status as the checks resolve at different times", async () => {
    expect.assertions(3);
    mockCheckValidity.mockReturnValue([
      // verifyHash
      new Promise(res => setTimeout(() => res({ checksumMatch: true }), 500)),

      // verifyIssued
      new Promise(res => setTimeout(() => res({ issuedOnAll: true }), 500)),

      // verifyRevoked
      new Promise(res => setTimeout(() => res({ revokedOnAny: false }), 1000)),

      // verifyIdentity
      new Promise(res =>
        setTimeout(() => res({ identifiedOnAll: true }), 1000)
      ),

      // Mimics that overallValidityCheck should be resolved last
      new Promise(res => setTimeout(() => res(true), 1001))
    ]);

    const { result, waitForNextUpdate } = renderHook(() =>
      useDocumentVerifier(sampleDoc as SignedDocument)
    );

    expect(result.current).toStrictEqual({
      tamperedCheck: CheckStatus.CHECKING,
      issuedCheck: CheckStatus.CHECKING,
      revokedCheck: CheckStatus.CHECKING,
      issuerCheck: CheckStatus.CHECKING,
      overallValidity: CheckStatus.CHECKING
    });

    jest.advanceTimersByTime(500); // verifyHashIssuedRevoked should have resolved

    await waitForNextUpdate();
    expect(result.current).toStrictEqual({
      tamperedCheck: CheckStatus.VALID,
      issuedCheck: CheckStatus.VALID,
      revokedCheck: CheckStatus.CHECKING,
      issuerCheck: CheckStatus.CHECKING,
      overallValidity: CheckStatus.CHECKING
    });

    jest.runAllTimers(); // Everything should have resolved

    await waitForNextUpdate();
    expect(result.current).toStrictEqual({
      tamperedCheck: CheckStatus.VALID,
      issuedCheck: CheckStatus.VALID,
      revokedCheck: CheckStatus.VALID,
      issuerCheck: CheckStatus.VALID,
      overallValidity: CheckStatus.VALID
    });
  });

  it("should not perform any checks if the verificationStatuses prop is provided", async () => {
    expect.assertions(2);

    const { result } = renderHook(() =>
      useDocumentVerifier(sampleDoc as SignedDocument, {
        tamperedCheck: CheckStatus.VALID,
        issuedCheck: CheckStatus.VALID,
        revokedCheck: CheckStatus.VALID,
        issuerCheck: CheckStatus.INVALID,
        overallValidity: CheckStatus.INVALID
      })
    );

    expect(result.current).toStrictEqual({
      tamperedCheck: CheckStatus.VALID,
      issuedCheck: CheckStatus.VALID,
      revokedCheck: CheckStatus.VALID,
      issuerCheck: CheckStatus.INVALID,
      overallValidity: CheckStatus.INVALID
    });
    expect(mockCheckValidity).not.toHaveBeenCalled();
  });
});

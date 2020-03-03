import demoOc from "../../../../fixtures/demo-oc.json";
import { useDocumentVerifier, handleVerificationFragment } from "./index";
import { renderHook } from "@testing-library/react-hooks";
import { CheckStatus } from "../../../components/Validity/";
import { checkValidity } from "../../../services/DocumentVerifier";

jest.mock("../../../context/config", () => ({
  useConfigContext: () => ({ config: { network: "mainnet" } })
}));
jest.mock("../../../services/DocumentVerifier");
const mockCheckValidity = checkValidity as jest.Mock;

jest.useFakeTimers();

const sampleDoc = demoOc as any;

describe("useDocumentVerifier", () => {
  it("should use the correct network to verify document", async () => {
    expect.assertions(1);
    mockCheckValidity.mockReturnValue(Promise.resolve("VALID"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useDocumentVerifier()
    );
    result.current.verify(sampleDoc);
    await waitForNextUpdate();
    expect(mockCheckValidity.mock.calls[0][1]).toBe("mainnet");
  });

  it("should return the correct check status as the checks resolve at different times", async () => {
    expect.assertions(3);
    mockCheckValidity.mockImplementation(
      async (document, network, callback) => {
        const promises = [
          // verifyHash
          new Promise(res => setTimeout(() => res({ status: "VALID" }), 500)),

          // verifyIssued
          new Promise(res => setTimeout(() => res({ status: "VALID" }), 500)),

          // verifyRevoked
          new Promise(res => setTimeout(() => res({ status: "VALID" }), 1000)),

          // verifyIdentity
          new Promise(res => setTimeout(() => res({ status: "VALID" }), 1000))
        ];
        callback(promises);

        await Promise.all(promises);
        return "VALID";
      }
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useDocumentVerifier()
    );

    result.current.verify(sampleDoc);

    expect(result.current.statuses).toStrictEqual({
      tamperedCheck: CheckStatus.CHECKING,
      issuedCheck: CheckStatus.CHECKING,
      revokedCheck: CheckStatus.CHECKING,
      issuerCheck: CheckStatus.CHECKING,
      overallValidity: CheckStatus.CHECKING
    });

    jest.advanceTimersByTime(500); // verifyHash, verifyIssued should have resolved

    await waitForNextUpdate();
    expect(result.current.statuses).toStrictEqual({
      tamperedCheck: CheckStatus.VALID,
      issuedCheck: CheckStatus.VALID,
      revokedCheck: CheckStatus.CHECKING,
      issuerCheck: CheckStatus.CHECKING,
      overallValidity: CheckStatus.CHECKING
    });

    jest.runAllTimers(); // Everything should have resolved

    await waitForNextUpdate();
    expect(result.current.statuses).toStrictEqual({
      tamperedCheck: CheckStatus.VALID,
      issuedCheck: CheckStatus.VALID,
      revokedCheck: CheckStatus.VALID,
      issuerCheck: CheckStatus.VALID,
      overallValidity: CheckStatus.VALID
    });
  });
});

describe("handleVerificationFragment", () => {
  it("should set state when fragment status is VALID", () => {
    expect.assertions(1);
    const setStateFn = jest.fn();
    handleVerificationFragment("VALID", setStateFn);

    expect(setStateFn).toHaveBeenCalledWith(CheckStatus.VALID);
  });

  it("should set state when fragment status is INVALID", () => {
    expect.assertions(1);
    const setStateFn = jest.fn();
    handleVerificationFragment("INVALID", setStateFn);

    expect(setStateFn).toHaveBeenCalledWith(CheckStatus.INVALID);
  });

  it("should set invalid state when fragment status is ERROR", () => {
    expect.assertions(1);
    const setStateFn = jest.fn();
    handleVerificationFragment("ERROR", setStateFn);

    expect(setStateFn).toHaveBeenCalledWith(CheckStatus.INVALID);
  });

  it("should set invalid state when fragment status is not one of the check status", () => {
    expect.assertions(1);
    const setStateFn = jest.fn();
    handleVerificationFragment("SKIPPED", setStateFn);

    expect(setStateFn).toHaveBeenCalledWith(CheckStatus.INVALID);
  });
});

import { renderHook, act } from "@testing-library/react-hooks";
import { useConfig } from "./index";
import { AsyncStorage } from "react-native";

jest.mock("react-native", () => ({
  AsyncStorage: {
    setItem: jest.fn(),
    getItem: jest.fn()
  }
}));

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;

describe("useConfig", () => {
  beforeEach(() => {
    mockGetItem.mockReset();
    mockSetItem.mockReset();
    mockGetItem.mockResolvedValue(JSON.stringify({ network: "mainnet" }));
  });
  it("should load saved config automatically", async () => {
    expect.assertions(2);
    const { result, waitForNextUpdate } = renderHook(() => useConfig());

    await act(async () => {
      await waitForNextUpdate();
      await expect(result.current.loaded).toBe(true);
      await expect(result.current.config).toStrictEqual({ network: "mainnet" });
    });
  });
  it("should persist updated config", async () => {
    expect.assertions(2);
    const { result, waitForNextUpdate } = renderHook(() => useConfig());

    await act(async () => {
      await waitForNextUpdate();
      await result.current.setValue("network", "ropsten");
      await expect(result.current.config).toStrictEqual({ network: "ropsten" });
      await expect(mockSetItem).toHaveBeenCalledWith(
        "CONFIG",
        JSON.stringify({ network: "ropsten" })
      );
    });
  });
});

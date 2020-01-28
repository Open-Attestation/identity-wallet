import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { Settings } from "./Settings";
import { mockNavigation, resetNavigation } from "../../test/helpers/navigation";
import { useConfig } from "../../common/hooks/useConfig";

jest.mock("../../common/navigation");
jest.mock("../../common/hooks/useConfig");

const mockUseConfig = useConfig as jest.Mock;
const mockSetValue = jest.fn();
mockUseConfig.mockReturnValue({
  config: { network: "ropsten" },
  setValue: mockSetValue
});

describe("Settings", () => {
  beforeEach(() => {
    resetNavigation();
  });
  it("should render the header", async () => {
    expect.assertions(2);
    const { queryByText, queryByTestId } = render(
      <Settings onResetDocumentData={() => {}} navigation={mockNavigation} />
    );
    await act(async () => {
      await expect(queryByText("Settings")).not.toBeNull();
      await expect(queryByTestId("header-bar")).not.toBeNull();
    });
  });
  it("should render the build no", async () => {
    expect.assertions(2);
    const { queryByText, queryByTestId } = render(
      <Settings onResetDocumentData={() => {}} navigation={mockNavigation} />
    );
    await act(async () => {
      await expect(queryByText("BUILD NO")).not.toBeNull();
      await expect(queryByTestId("build-no")).not.toBeNull();
    });
  });
  it("should render the bottom nav", async () => {
    expect.assertions(1);
    const { queryByTestId } = render(
      <Settings onResetDocumentData={() => {}} navigation={mockNavigation} />
    );
    await act(async () => {
      await expect(queryByTestId("bottom-nav")).not.toBeNull();
    });
  });
  it("should fire onResetDocumentData when delete is pressed", async () => {
    expect.assertions(1);
    const mockOnResetDocumentData = jest.fn();
    const { getByText } = render(
      <Settings
        onResetDocumentData={mockOnResetDocumentData}
        navigation={mockNavigation}
      />
    );
    fireEvent.press(getByText("Delete"));
    await act(async () => {
      await expect(mockOnResetDocumentData).toHaveBeenCalledTimes(1);
    });
  });
  it("should navigate to DocumentListScreen on bottom nav", async () => {
    expect.assertions(1);
    const { getAllByTestId } = render(
      <Settings onResetDocumentData={() => {}} navigation={mockNavigation} />
    );
    fireEvent.press(getAllByTestId("nav-tab")[0]);
    await act(async () => {
      await expect(mockNavigation.dispatch).toHaveBeenCalledWith({
        routeName: "DocumentListScreen",
        type: "Navigation/REPLACE"
      });
    });
  });
  it("should navigate to QrScannerScreen on bottom nav", async () => {
    expect.assertions(1);
    const { getAllByTestId } = render(
      <Settings onResetDocumentData={() => {}} navigation={mockNavigation} />
    );
    fireEvent.press(getAllByTestId("nav-tab")[1]);
    await act(async () => {
      await expect(mockNavigation.dispatch).toHaveBeenCalledWith({
        routeName: "QrScannerScreen",
        type: "Navigation/REPLACE"
      });
    });
  });
  it("should show network from config", async () => {
    expect.assertions(1);
    const { queryByText } = render(
      <Settings onResetDocumentData={() => {}} navigation={mockNavigation} />
    );
    await act(async () => {
      await expect(queryByText("ROPSTEN")).not.toBeNull();
    });
  });
  it("should toggle network when netowrk toggle is pressed", async () => {
    expect.assertions(1);
    const mockOnResetDocumentData = jest.fn();
    const { getByText } = render(
      <Settings
        onResetDocumentData={mockOnResetDocumentData}
        navigation={mockNavigation}
      />
    );
    fireEvent.press(getByText("ROPSTEN"));
    await act(async () => {
      await expect(mockSetValue).toHaveBeenCalledWith("network", "mainnet");
    });
  });
});

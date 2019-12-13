import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CheckStatus } from "../Validity";
import { ValidityCheckScreen } from "./ValidityCheckScreen";
import { mockNavigation, resetNavigation } from "../../test/helpers/navigation";
jest.mock("../../common/navigation");

import { useDocumentVerifier } from "../../common/hooks/useDocumentVerifier";
jest.mock("../../common/hooks/useDocumentVerifier");
const mockUseVerifier = useDocumentVerifier as jest.Mock;

jest.mock("../Validity/ValidityIcon", () => ({
  ValidityIcon: () => null
}));

jest.useFakeTimers();

describe("ValidityCheckScreen", () => {
  beforeEach(() => {
    resetNavigation();
  });

  it("should not navigate when document is still being checked", () => {
    expect.assertions(1);
    mockUseVerifier.mockReturnValue({ overallValidity: CheckStatus.CHECKING });

    render(<ValidityCheckScreen navigation={mockNavigation} />);

    jest.runAllTimers();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it("should not navigate when document is invalid", () => {
    expect.assertions(1);
    mockUseVerifier.mockReturnValue({ overallValidity: CheckStatus.INVALID });

    render(<ValidityCheckScreen navigation={mockNavigation} />);

    jest.runAllTimers();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it("should navigate when document is valid", () => {
    expect.assertions(1);
    mockUseVerifier.mockReturnValue({ overallValidity: CheckStatus.VALID });

    render(<ValidityCheckScreen navigation={mockNavigation} />);

    jest.runAllTimers();
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
  });

  it("should go back when back button is pressed", () => {
    expect.assertions(1);

    const { getByTestId } = render(
      <ValidityCheckScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId("header-back-button"));
    expect(mockNavigation.goBack).toHaveBeenCalledWith();
  });
});

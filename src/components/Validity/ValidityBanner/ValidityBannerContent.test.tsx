import React from "react";
import { render } from "@testing-library/react-native";
import { ValidityBannerContent } from "./ValidityBannerContent";
import { CheckStatus } from "../constants";
import { getStatusProps } from "../utils";

jest.mock("../ValidityIcon", () => ({
  ValidityIcon: () => null
}));

jest.useFakeTimers();

describe("ValidityBannerContent", () => {
  describe("when offline", () => {
    it("should use the same background color as when checkStatus is checking", () => {
      expect.assertions(1);
      const { backgroundColor: targetColor } = getStatusProps(
        CheckStatus.CHECKING
      );
      const { queryByTestId } = render(
        <ValidityBannerContent
          isConnected={false}
          checkStatus={CheckStatus.VALID}
        />
      );
      expect(queryByTestId("validity-banner-content")).toHaveStyle({
        backgroundColor: targetColor
      });
    });
  });
});

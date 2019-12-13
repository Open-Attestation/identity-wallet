import React from "react";
import { render } from "@testing-library/react-native";
import { ValidityCheckItem } from "./ValidityBannerCheckItem";
import { CheckStatus } from "../constants";

const messages = {
  [CheckStatus.CHECKING]: { message: "Checking" },
  [CheckStatus.INVALID]: { message: "Invalid" },
  [CheckStatus.VALID]: { message: "Valid" }
};

describe("ValidityCheckItem", () => {
  describe("when checkStatus is checking", () => {
    it("should render with the correct message", () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityCheckItem
          checkStatus={CheckStatus.CHECKING}
          messages={messages}
        />
      );
      expect(queryByTestId("validity-check-message")).toHaveTextContent(
        "Checking"
      );
    });
  });

  describe("when checkStatus is invalid", () => {
    it("should render with the correct message", () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityCheckItem
          checkStatus={CheckStatus.INVALID}
          messages={messages}
        />
      );
      expect(queryByTestId("validity-check-message")).toHaveTextContent(
        "Invalid"
      );
    });
  });

  describe("when checkStatus is valid", () => {
    it("should render with the correct message", () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityCheckItem
          checkStatus={CheckStatus.VALID}
          messages={messages}
        />
      );
      expect(queryByTestId("validity-check-message")).toHaveTextContent(
        "Valid"
      );
    });
  });
});

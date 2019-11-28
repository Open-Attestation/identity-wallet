import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { ValidityCheckItem } from "./ValidityCheckItem";

const messages = {
  checking: <Text>Checking</Text>,
  invalid: <Text>Invalid</Text>,
  valid: <Text>Valid</Text>,
  unknown: <Text>Unknown</Text>
};

describe("ValidityCheckItem", () => {
  describe("when checkStatus is checking", () => {
    it("should render with the correct message", () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityCheckItem checkStatus="checking" messages={messages} />
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
        <ValidityCheckItem checkStatus="invalid" messages={messages} />
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
        <ValidityCheckItem checkStatus="valid" messages={messages} />
      );
      expect(queryByTestId("validity-check-message")).toHaveTextContent(
        "Valid"
      );
    });
  });

  describe("when checkStatus is unknown", () => {
    it("should render with the correct message", () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityCheckItem checkStatus="unknown" messages={messages} />
      );
      expect(queryByTestId("validity-check-message")).toHaveTextContent(
        "Unknown"
      );
    });
  });
});

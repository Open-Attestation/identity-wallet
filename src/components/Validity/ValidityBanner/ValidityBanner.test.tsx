import React from "react";
import { render, wait } from "@testing-library/react-native";
import { ValidityBanner } from "./ValidityBanner";
import { CheckStatus } from "../constants";

jest.useFakeTimers();

describe("ValidityBanner", () => {
  describe("when everything is valid", () => {
    it("should provide ValidityBannerHeader the correct progress prop", async () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityBanner
          tamperedCheck={CheckStatus.VALID}
          issuedCheck={CheckStatus.VALID}
          revokedCheck={CheckStatus.VALID}
          identityCheck={CheckStatus.VALID}
          overallValidity={CheckStatus.VALID}
          initialIsExpanded={false}
        />
      );
      await wait(() => {
        expect(queryByTestId("validity-header-progress")).toHaveStyle({
          width: "100%"
        });
      });
    });
  });

  describe("when some checks are invalid", () => {
    it("should provide ValidityBannerHeader the correct progress prop", async () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityBanner
          tamperedCheck={CheckStatus.VALID}
          issuedCheck={CheckStatus.VALID}
          revokedCheck={CheckStatus.CHECKING}
          identityCheck={CheckStatus.INVALID}
          overallValidity={CheckStatus.INVALID}
          initialIsExpanded={false}
        />
      );
      await wait(() =>
        expect(queryByTestId("validity-header-progress")).toHaveStyle({
          width: "75%"
        })
      );
    });
  });

  describe("when some checks are still in progress and no invalid checks", () => {
    it("should provide ValidityBannerHeader the correct progress prop", async () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityBanner
          tamperedCheck={CheckStatus.VALID}
          issuedCheck={CheckStatus.CHECKING}
          revokedCheck={CheckStatus.CHECKING}
          identityCheck={CheckStatus.VALID}
          overallValidity={CheckStatus.CHECKING}
          initialIsExpanded={false}
        />
      );

      await wait(() =>
        expect(queryByTestId("validity-header-progress")).toHaveStyle({
          width: "50%"
        })
      );
    });
  });

  describe("when online", () => {
    it("should not show the offline message", async () => {
      expect.assertions(1);
      const { queryAllByTestId } = render(
        <ValidityBanner
          tamperedCheck={CheckStatus.VALID}
          issuedCheck={CheckStatus.VALID}
          revokedCheck={CheckStatus.VALID}
          identityCheck={CheckStatus.VALID}
          overallValidity={CheckStatus.VALID}
          initialIsExpanded={false}
          isConnected={true}
        />
      );
      await wait(() => {
        expect(queryAllByTestId("offline-message")).toHaveLength(0);
      });
    });
  });

  describe("when offline", () => {
    it("should show the offline message", async () => {
      expect.assertions(1);
      const { queryAllByTestId } = render(
        <ValidityBanner
          tamperedCheck={CheckStatus.VALID}
          issuedCheck={CheckStatus.VALID}
          revokedCheck={CheckStatus.VALID}
          identityCheck={CheckStatus.VALID}
          overallValidity={CheckStatus.VALID}
          initialIsExpanded={false}
          isConnected={false}
        />
      );
      await wait(() => {
        expect(queryAllByTestId("offline-message")).toHaveLength(2);
      });
    });
  });
});

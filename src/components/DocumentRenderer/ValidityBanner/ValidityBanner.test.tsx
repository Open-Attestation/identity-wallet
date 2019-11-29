import React from "react";
import { render, wait } from "@testing-library/react-native";
import { ValidityBanner } from "./index";
import { CheckStatus } from "./types";

jest.useFakeTimers();

describe("ValidityBanner", () => {
  describe("when the banner is not expanded", () => {
    it("should not show the content", async () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityBanner
          tamperedCheck={CheckStatus.VALID}
          issuedCheck={CheckStatus.VALID}
          revokedCheck={CheckStatus.VALID}
          issuerCheck={CheckStatus.VALID}
          initialIsExpanded={false}
        />
      );
      await wait(() => {
        expect(queryByTestId("validity-banner-content")).toBeNull();
      });
    });

    describe("when everything is valid", () => {
      it("should show the valid label", async () => {
        expect.assertions(1);
        const { queryByTestId } = render(
          <ValidityBanner
            tamperedCheck={CheckStatus.VALID}
            issuedCheck={CheckStatus.VALID}
            revokedCheck={CheckStatus.VALID}
            issuerCheck={CheckStatus.VALID}
            initialIsExpanded={false}
          />
        );
        await wait(() => {
          expect(queryByTestId("validity-header-label")).toHaveTextContent(
            "Valid"
          );
        });
      });
    });

    describe("when some checks are invalid", () => {
      it("should show the invalid label", async () => {
        expect.assertions(1);
        const { queryByTestId } = render(
          <ValidityBanner
            tamperedCheck={CheckStatus.VALID}
            issuedCheck={CheckStatus.VALID}
            revokedCheck={CheckStatus.CHECKING}
            issuerCheck={CheckStatus.INVALID}
            initialIsExpanded={false}
          />
        );

        await wait(() => {
          expect(queryByTestId("validity-header-label")).toHaveTextContent(
            "Invalid"
          );
        });
      });
    });

    describe("when some checks are still in progress and no invalid checks", () => {
      it("should show the checking label", async () => {
        expect.assertions(1);
        const { queryByTestId } = render(
          <ValidityBanner
            tamperedCheck={CheckStatus.VALID}
            issuedCheck={CheckStatus.VALID}
            revokedCheck={CheckStatus.CHECKING}
            issuerCheck={CheckStatus.VALID}
            initialIsExpanded={false}
          />
        );
        await wait(() => {
          expect(queryByTestId("validity-header-label")).toHaveTextContent(
            "Verifying..."
          );
        });
      });
    });
  });

  describe("when the banner is expanded", () => {
    it("should show the content", async () => {
      expect.assertions(1);
      const { queryByTestId } = render(
        <ValidityBanner
          tamperedCheck={CheckStatus.VALID}
          issuedCheck={CheckStatus.VALID}
          revokedCheck={CheckStatus.VALID}
          issuerCheck={CheckStatus.VALID}
          initialIsExpanded={true}
        />
      );
      await wait(() => {
        expect(queryByTestId("validity-banner-content")).not.toBeNull();
      });
    });
  });
});

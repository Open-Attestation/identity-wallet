import React from "react";
import { render, wait } from "@testing-library/react-native";
import sampleDoc from "../../../fixtures/demo-oc.json";
import { DocumentDetailsSheet } from "./DocumentDetailsSheet";

import { checkValidity } from "../../services/DocumentVerifier";
jest.mock("../../services/DocumentVerifier");
const checkValidityMock = checkValidity as jest.Mock;

jest.useFakeTimers();

describe("DocumentDetailsSheet", () => {
  it("should show the correct issuer name", async () => {
    expect.assertions(1);
    checkValidityMock.mockReturnValue([
      Promise.resolve({
        hash: { checksumMatch: true },
        issued: { issuedOnAll: true },
        revoked: { revokedOnAny: false },
        valid: true
      }),

      Promise.resolve({
        identifiedOnAll: true,
        details: []
      })
    ]);
    const { queryByText } = render(
      <DocumentDetailsSheet document={sampleDoc} />
    );
    await wait(() => {
      expect(queryByText("Govtech")).not.toBeNull();
    });
  });
});

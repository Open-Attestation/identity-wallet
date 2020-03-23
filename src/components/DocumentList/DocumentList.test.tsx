import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { DocumentItem, DocumentList } from "./DocumentList";
import { VerifierTypes } from "../../types";

const sampleDocuments: DocumentItem[] = [
  {
    id: "1",
    title: "Document 1",
    verifierType: VerifierTypes.OpenAttestation
  },
  {
    id: "2",
    title: "Document 2",
    isVerified: true,
    lastVerification: 1,
    verifierType: VerifierTypes.OpenAttestation
  },
  {
    id: "3",
    title: "Document 3",
    isVerified: false,
    lastVerification: 1,
    verifierType: VerifierTypes.OpenAttestation
  }
];

describe("DocumentList", () => {
  it("should render the a list of DocumentListItem", () => {
    expect.assertions(1);
    const { queryAllByTestId } = render(
      <DocumentList
        documents={sampleDocuments}
        navigateToDoc={(): void => {}}
      />
    );
    expect(queryAllByTestId("document-list-item")).toHaveLength(3);
  });

  it("should fire navigateToDoc with id of document when DocumentListItem is pressed", () => {
    expect.assertions(3);
    const navigateToDoc = jest.fn();
    const { queryAllByTestId } = render(
      <DocumentList documents={sampleDocuments} navigateToDoc={navigateToDoc} />
    );
    // Press first DocumentListItem
    fireEvent.press(queryAllByTestId("document-list-item")[0]);
    expect(navigateToDoc).toHaveBeenCalledWith("1", "OpenAttestation");
    // Press second DocumentListItem
    fireEvent.press(queryAllByTestId("document-list-item")[1]);
    expect(navigateToDoc).toHaveBeenCalledWith("2", "OpenAttestation");
    // Press third DocumentListItem
    fireEvent.press(queryAllByTestId("document-list-item")[2]);
    expect(navigateToDoc).toHaveBeenCalledWith("3", "OpenAttestation");
  });
});

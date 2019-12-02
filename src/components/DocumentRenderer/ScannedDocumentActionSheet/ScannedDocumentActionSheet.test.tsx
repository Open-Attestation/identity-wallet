import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ScannedDocumentActionSheet } from "./index";

describe("ScannedDocumentActionSheet", () => {
  it("should render the issuing entity's identifier", () => {
    expect.assertions(1);
    const { getByText } = render(
      <ScannedDocumentActionSheet issuedBy="foobar" isSavable={false} />
    );
    expect(getByText("foobar")).not.toBeNull();
  });
  it("should not render the save button when document is not savable", () => {
    expect.assertions(1);
    const { queryByText } = render(
      <ScannedDocumentActionSheet issuedBy="foobar" isSavable={false} />
    );
    expect(queryByText("Save")).toBeNull();
  });
  it("should render the done button when document is unsavable", () => {
    expect.assertions(1);
    const { getByText } = render(
      <ScannedDocumentActionSheet issuedBy="foobar" isSavable={false} />
    );
    expect(getByText("Done")).not.toBeNull();
  });
  it("should render the save button when document is savable", () => {
    expect.assertions(1);
    const { getByText } = render(
      <ScannedDocumentActionSheet issuedBy="foobar" isSavable={true} />
    );
    expect(getByText("Save")).not.toBeNull();
  });
  it("should render the cancel button when document is savable", () => {
    expect.assertions(1);
    const { getByText } = render(
      <ScannedDocumentActionSheet issuedBy="foobar" isSavable={true} />
    );
    expect(getByText("Cancel")).not.toBeNull();
  });
  it("should trigger onSave when the save button is pressed (savable doc)", () => {
    expect.assertions(1);
    const onSave = jest.fn();
    const { getByText } = render(
      <ScannedDocumentActionSheet
        issuedBy="foobar"
        isSavable={true}
        onSave={onSave}
      />
    );
    fireEvent.press(getByText("Save"));
    expect(onSave).toHaveBeenCalledTimes(1);
  });
  it("should trigger onCancel when the cancel button is pressed (savable doc)", () => {
    expect.assertions(1);
    const onCancel = jest.fn();
    const { getByText } = render(
      <ScannedDocumentActionSheet
        issuedBy="foobar"
        isSavable={true}
        onCancel={onCancel}
      />
    );
    fireEvent.press(getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  it("should trigger onDone when the done button is pressed (unsavable doc)", () => {
    expect.assertions(1);
    const onDone = jest.fn();
    const { getByText } = render(
      <ScannedDocumentActionSheet
        issuedBy="foobar"
        isSavable={false}
        onDone={onDone}
      />
    );
    fireEvent.press(getByText("Done"));
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});

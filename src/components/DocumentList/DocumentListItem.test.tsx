import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { DocumentListItem } from "./DocumentListItem";

describe("DocumentListItem", () => {
  it("should show the title and VerifiedLabel", () => {
    const { queryByText, queryByTestId } = render(
      <DocumentListItem
        title="My Degree"
        isVerified={true}
        lastVerification={1}
        onPress={() => {}}
      />
    );
    expect(queryByText("My Degree")).not.toBeNull();
    expect(queryByTestId("verified-label")).not.toBeNull();
  });

  it("should fire onPress props when pressed", () => {
    expect.assertions(2);
    const onPress = jest.fn();
    const { getByText, getByTestId } = render(
      <DocumentListItem
        title="My Degree"
        isVerified={true}
        lastVerification={1}
        onPress={onPress}
      />
    );
    fireEvent.press(getByText("My Degree"));
    expect(onPress.mock.calls).toEqual([[]]);
    fireEvent.press(getByTestId("verified-label"));
    expect(onPress.mock.calls).toEqual([[], []]);
  });
});

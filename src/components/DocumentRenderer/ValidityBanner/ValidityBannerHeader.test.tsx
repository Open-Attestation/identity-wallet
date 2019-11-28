import React from "react";
import { render, wait } from "@testing-library/react-native";
import { ValidityBannerHeader } from "./ValidityBannerHeader";

jest.useFakeTimers();

describe("ValidityBannerHeader", () => {
  it("should show up arrow when expanded", async () => {
    expect.assertions(1);
    const { queryByTestId } = render(
      <ValidityBannerHeader isExpanded={true} onPress={jest.fn()} />
    );
    await wait(() => {
      expect(queryByTestId("validity-header-icon")).toHaveProp(
        "name",
        "chevron-up"
      );
    });
  });

  it("should show down arrow when collapsed", async () => {
    expect.assertions(1);
    const { queryByTestId } = render(
      <ValidityBannerHeader isExpanded={false} onPress={jest.fn()} />
    );
    await wait(() => {
      expect(queryByTestId("validity-header-icon")).toHaveProp(
        "name",
        "chevron-down"
      );
    });
  });
});

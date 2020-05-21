import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { BottomNav } from "./BottomNav";
import { mockNavigation, resetNavigation, mockState } from "../../test/helpers/navigation";
import { color } from "../../common/styles";

jest.mock("../../common/navigation");

describe("BottomNav", () => {
  beforeEach(() => {
    resetNavigation();
  });

  it("should render three tabs", () => {
    // This test will fail if setup.jest.js does not mock the icon
    expect.assertions(1);
    const { queryAllByTestId } = render(
      <BottomNav navigation={mockNavigation} state={mockState} descriptors={{}} />
    );
    expect(queryAllByTestId("nav-tab")).toHaveLength(3);
  });

  it("should go to `DocumentListScreen` when Home tab is pressed", () => {
    expect.assertions(1);
    mockNavigation.emit = () => {
      return { defaultPrevented: false }
    };
    const { queryAllByTestId } = render(
      <BottomNav navigation={mockNavigation} state={mockState} descriptors={{}} />
    );
    fireEvent.press(queryAllByTestId("nav-tab")[0]);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("DocumentListStackScreen");
    // expect(queryAllByTestId("nav-tab")[0].children[0]).toHaveStyle([{
    //   color: color("orange", 40)
    // }]);
    // expect(queryAllByTestId("nav-tab")[1].children[0]).toHaveProp(
    //   "fill",
    //   color("grey", 30)
    // );
    // expect(queryAllByTestId("nav-tab")[2].children[0]).toHaveStyle({
    //   color: color("grey", 30)
    // });
  });

  it("should go to `QrScannerScreen` when QR tab is pressed", () => {
    expect.assertions(1);
    mockNavigation.emit = () => {
      return { defaultPrevented: false }
    };
    const { queryAllByTestId } = render(
      <BottomNav navigation={mockNavigation} state={mockState} descriptors={{}} />
    );
    fireEvent.press(queryAllByTestId("nav-tab")[1]);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("QrScannerStackScreen", {"screen": "QrScannerScreen"});
    // expect(queryAllByTestId("nav-tab")[0].children[0]).toHaveStyle({
    //   color: color("grey", 30)
    // });
    // expect(queryAllByTestId("nav-tab")[1].children[0]).toHaveProp(
    //   "fill",
    //   color("orange", 40)
    // );
    // expect(queryAllByTestId("nav-tab")[2].children[0]).toHaveStyle({
    //   color: color("grey", 30)
    // });
  });

  it("should go to `SettingsScreen` when Settings tab is pressed", () => {
    expect.assertions(1);
    mockNavigation.emit = () => {
      return { defaultPrevented: false }
    };
    const { queryAllByTestId } = render(
      <BottomNav navigation={mockNavigation} state={mockState} descriptors={{}} />
    );
    fireEvent.press(queryAllByTestId("nav-tab")[2]);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("SettingsScreen");
    // expect(queryAllByTestId("nav-tab")[0].children[0]).toHaveStyle({
    //   color: color("grey", 30)
    // });
    // expect(queryAllByTestId("nav-tab")[1].children[0]).toHaveProp(
    //   "fill",
    //   color("grey", 30)
    // );
    // expect(queryAllByTestId("nav-tab")[2].children[0]).toHaveStyle({
    //   color: color("orange", 40)
    // });
  });
});

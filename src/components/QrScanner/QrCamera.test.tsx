import React from "react";
import { render, wait } from "@testing-library/react-native";
import { QrCamera } from "./QrCamera";
import * as Permissions from "expo-permissions";

const mockPermissions = Permissions.askAsync as jest.Mock;

jest.mock("expo-permissions", () => ({
  askAsync: jest.fn()
}));

const mockPlatform = (platform: "android" | "ios"): void => {
  jest.resetModules();
  jest.doMock("react-native/Libraries/Utilities/Platform", () => ({
    OS: platform,
    select: jest.fn()
  }));
};

describe("QrCamera", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPermissions.mockReset();
  });

  it("should render LoadingView if the camera is disabled", async () => {
    expect.assertions(3);
    mockPlatform("android");
    mockPermissions.mockResolvedValue({ status: "granted" });
    const { queryByTestId } = render(
      <QrCamera onQrData={() => {}} disabled={true} />
    );

    await wait(() => {
      expect(queryByTestId("permissions-rejected-view")).toBeNull();
      expect(queryByTestId("qr-camera")).toBeNull();
      expect(queryByTestId("loading-view")).not.toBeNull();
    });
  });

  it("should render Camera if the camera is enabled", async () => {
    expect.assertions(4);
    mockPlatform("android");
    mockPermissions.mockResolvedValue({ status: "granted" });
    const { queryByTestId } = render(
      <QrCamera onQrData={() => {}} disabled={false} />
    );
    expect(queryByTestId("loading-view")).not.toBeNull();

    await wait(() => {
      expect(queryByTestId("permissions-rejected-view")).toBeNull();
      expect(queryByTestId("qr-camera")).not.toBeNull();
      expect(queryByTestId("loading-view")).toBeNull();
    });
  });

  it("should not render if camera permission is not given", async () => {
    expect.assertions(3);
    mockPlatform("android");
    mockPermissions.mockResolvedValue({ status: "nil" });
    const { queryByTestId } = render(
      <QrCamera onQrData={() => {}} disabled={false} />
    );

    await wait(() => {
      expect(queryByTestId("permissions-rejected-view")).not.toBeNull();
      expect(queryByTestId("qr-camera")).toBeNull();
      expect(queryByTestId("loading-view")).toBeNull();
    });
  });

  it("should set the ratio of the camera if on Android", async () => {
    expect.assertions(1);
    mockPlatform("android");
    mockPermissions.mockResolvedValue({ status: "granted" });
    const { queryByTestId } = render(
      <QrCamera onQrData={() => {}} disabled={false} />
    );
    await wait(() => {
      expect(queryByTestId("qr-camera")?.props).toHaveProperty("ratio", "16:9");
    });
  });

  it("should not set the ratio of the camera if on iOS", async () => {
    expect.assertions(1);
    mockPlatform("ios");
    mockPermissions.mockResolvedValue({ status: "granted" });
    const { queryByTestId } = render(
      <QrCamera onQrData={() => {}} disabled={false} />
    );
    await wait(() => {
      expect(queryByTestId("qr-camera")?.props).not.toHaveProperty("ratio");
    });
  });
});

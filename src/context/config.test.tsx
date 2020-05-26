import React, { FunctionComponent } from "react";
import { useConfigContext, ConfigContextProvider } from "./config";
import { AsyncStorage, Text, Button, View } from "react-native";
import {
  render,
  waitForElementToBeRemoved,
  fireEvent
} from "@testing-library/react-native";
import { NetworkTypes } from "../types";

jest.setMock("react-native/Libraries/Storage/AsyncStorage", {
  setItem: jest.fn(),
  getItem: jest.fn()
});

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;

const TestComponent: FunctionComponent = () => {
  const { config, setConfigValue } = useConfigContext();
  return (
    <View>
      <Text testID="printed-network">{config.network}</Text>
      <Button
        title="Change"
        onPress={() => setConfigValue("network", NetworkTypes.ropsten)}
      />
    </View>
  );
};

describe("useConfigContext", () => {
  beforeEach(() => {
    mockGetItem.mockReset();
    mockSetItem.mockReset();
    mockGetItem.mockResolvedValue(JSON.stringify({ network: "mainnet" }));
  });

  it("should load saved config from async storage properly", async () => {
    expect.assertions(5);
    const { queryByTestId } = render(
      <ConfigContextProvider>
        <TestComponent />
      </ConfigContextProvider>
    );
    expect(queryByTestId("loading-view")).not.toBeNull();
    expect(queryByTestId("printed-network")).toBeNull();

    await waitForElementToBeRemoved(() => queryByTestId("loading-view"));
    expect(queryByTestId("loading-view")).toBeNull();
    expect(queryByTestId("printed-network")).not.toBeNull();
    expect(queryByTestId("printed-network")).toHaveTextContent("mainnet");
  });

  it("should persist updated config", async () => {
    expect.assertions(2);
    const { queryByTestId, getByText } = render(
      <ConfigContextProvider>
        <TestComponent />
      </ConfigContextProvider>
    );
    await waitForElementToBeRemoved(() => queryByTestId("loading-view"));
    expect(queryByTestId("printed-network")).toHaveTextContent("mainnet");

    fireEvent.press(getByText("Change"));
    expect(queryByTestId("printed-network")).toHaveTextContent("ropsten");
  });
});

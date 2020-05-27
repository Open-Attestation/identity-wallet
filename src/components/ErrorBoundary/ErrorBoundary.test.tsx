import React, { FunctionComponent } from "react";
import { render } from "@testing-library/react-native";
import { ErrorBoundary } from "./ErrorBoundary";
import { View, Text } from "react-native";

interface TestComponent {
  shouldThrow: boolean;
}

const TestComponent: FunctionComponent<TestComponent> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error("Test Error");
  }
  return (
    <View testID="no-error-view">
      <Text>No Errors</Text>
    </View>
  );
};

describe("ErrorBoundary", () => {
  it("should not render errorboundry if no error", () => {
    expect.assertions(2);
    const { queryByTestId } = render(
      <ErrorBoundary>
        <TestComponent shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(queryByTestId("no-error-view")).not.toBeNull();
    expect(queryByTestId("error-boundary")).toBeNull();
  });

  it("should render errorboundry if hasError", () => {
    expect.assertions(3);
    const { queryByTestId } = render(
      <ErrorBoundary>
        <TestComponent shouldThrow />
      </ErrorBoundary>
    );

    expect(queryByTestId("no-error-view")).toBeNull();
    expect(queryByTestId("error-boundary")).not.toBeNull();
    expect(queryByTestId("error-text")?.children[0]).toContain("Test Error");
  });
});

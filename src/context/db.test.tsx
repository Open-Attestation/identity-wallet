import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { DbContextProvider, useDbContext } from "./db";
import { render } from "@testing-library/react-native";

const TestComponent = (): JSX.Element => {
  const { db, setDb } = useDbContext();
  const mockDb = "MOCK_DB" as any;
  useEffect(() => {
    setDb(mockDb);
  }, []);
  return <Text testID="printed-db">{db}</Text>;
};

const PassthroughParent = ({ children }: { children: JSX.Element }) => (
  <View>{children}</View>
);

const WrappedComponent = () => (
  <DbContextProvider>
    <PassthroughParent>
      <TestComponent />
    </PassthroughParent>
  </DbContextProvider>
);

it("DbContextProvider gives context to successors", async () => {
  const { getByTestId } = render(<WrappedComponent />);
  expect(getByTestId("printed-db").props.children).toBe("MOCK_DB");
});

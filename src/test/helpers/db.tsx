import React, { FunctionComponent } from "react";
import { act } from "@testing-library/react-native";
import { DbContext } from "../../context/db";

const mockSubscribe = jest.fn();
const documents = {
  find: () => documents,
  findOne: () => documents,
  sort: () => documents,
  $: {
    subscribe: mockSubscribe
  }
};
const mockDb: any = {
  documents
};

export const MockDbProvider: FunctionComponent = ({ children }) => (
  <DbContext.Provider value={{ db: mockDb }}>{children}</DbContext.Provider>
);

export const whenDbSubscriptionReturns = (results: any): void => {
  const setFunction = mockSubscribe.mock.calls[0][0];
  act(() => setFunction(results));
};

export const resetDb = mockSubscribe.mockReset;

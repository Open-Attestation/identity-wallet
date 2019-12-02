import React, { FunctionComponent } from "react";
import { act } from "@testing-library/react-native";
import { DbContext } from "./db";
import { DocumentObject } from "../types";

const mockSubscribe = jest.fn();
const documents = {
  find: () => documents,
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

export const whenDbFoundDocuments = (
  returnedDocuments: DocumentObject[]
): void => {
  const setDocuments = mockSubscribe.mock.calls[0][0];
  act(() => setDocuments(returnedDocuments));
};

export const resetDb = mockSubscribe.mockReset;

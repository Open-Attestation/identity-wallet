import React from "react";
import { render } from "@testing-library/react-native";
import { MockDbProvider } from "../../test/helpers/db";
import { mockNavigation, setParam } from "../../test/helpers/navigation";
import { processQr } from "../../services/QrProcessor";

import { initialiseDb } from "./utils";
import { InitialisationContainer } from "./InitialisationContainer";

jest.mock("../../services/QrProcessor");
jest.mock("rxdb");
jest.mock("./utils");

const mockInitialiseDb = initialiseDb as jest.Mock;
const mockProcessQr = processQr as jest.Mock;

const getOnInitDb = (mockInitialiseDb: jest.Mock): Function =>
  mockInitialiseDb.mock.calls[0][0].onInitDb;

describe("InitialisationContainer", () => {
  beforeEach(() => {
    mockInitialiseDb.mockReset();
    mockProcessQr.mockReset();
  });
  it("should call initialiseDb on mount", () => {
    expect.assertions(1);
    render(
      <MockDbProvider>
        <InitialisationContainer navigation={mockNavigation} />
      </MockDbProvider>
    );
    expect(mockInitialiseDb).toHaveBeenCalledTimes(1);
  });

  it("should navigate to StackNavigator after initialisation without actions", async () => {
    expect.assertions(1);
    render(
      <MockDbProvider>
        <InitialisationContainer navigation={mockNavigation} />
      </MockDbProvider>
    );
    const onInitDb = getOnInitDb(mockInitialiseDb);
    await onInitDb();
    expect(mockNavigation.navigate).toHaveBeenCalledWith("StackNavigator");
  });

  it("should navigate to ValidityCheckScreen with savable document action", async () => {
    expect.assertions(2);
    setParam("q", "ACTION_QUERY_STRING");

    render(
      <MockDbProvider>
        <InitialisationContainer navigation={mockNavigation} />
      </MockDbProvider>
    );
    const onInitDb = getOnInitDb(mockInitialiseDb);
    await onInitDb();
    expect(mockProcessQr.mock.calls[0][0]).toBe(
      "https://action.openattestation.com?q=ACTION_QUERY_STRING"
    );

    // Calling onDocumentStore from processQr
    const onDocumentStore = mockProcessQr.mock.calls[0][1].onDocumentStore;
    onDocumentStore("MOCK_DOCUMENT");

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      "ValidityCheckScreen",
      {
        document: "MOCK_DOCUMENT",
        savable: true
      }
    );
  });

  it("should navigate to ValidityCheckScreen with non-savable document action", async () => {
    expect.assertions(2);
    setParam("document", "ACTION_QUERY_STRING");

    render(
      <MockDbProvider>
        <InitialisationContainer navigation={mockNavigation} />
      </MockDbProvider>
    );
    const onInitDb = getOnInitDb(mockInitialiseDb);
    await onInitDb();
    expect(mockProcessQr.mock.calls[0][0]).toBe(
      "https://action.openattestation.com?q=ACTION_QUERY_STRING"
    );

    // Calling onDocumentView from processQr
    const onDocumentView = mockProcessQr.mock.calls[0][1].onDocumentView;
    onDocumentView("MOCK_DOCUMENT");

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      "ValidityCheckScreen",
      {
        document: "MOCK_DOCUMENT"
      }
    );
  });
});

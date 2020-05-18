import React, { useEffect, FunctionComponent } from "react";
import { InitialisationScreenProps, OAWrappedDocument } from "../../types";
import { useDbContext } from "../../context/db";
import { LoadingView } from "../Loading";
import { processQr } from "../../services/QrProcessor";
import { initialiseDb } from "./utils";

export const InitialisationContainer: FunctionComponent<InitialisationScreenProps> = ({
  navigation,
  route
}: InitialisationScreenProps) => {
  const { db, setDb } = useDbContext();
  const query: string | undefined = route.params?.q ?? undefined;
  const action = `https://action.openattestation.com?q=${query}`;

  const onDocumentStore = (document: OAWrappedDocument): void => {
    navigation.navigate("QrScannerStackScreen", {
      screen: "ValidityCheckScreen", params: {
        document,
        savable: true
      }
    });
  };
  const onDocumentView = (document: OAWrappedDocument): void => {
    navigation.navigate("QrScannerStackScreen", { screen: "ValidityCheckScreen", params: { document } });
  };

  const onInitDb = async (): Promise<void> => {
    if (!query) {
      navigation.navigate("DocumentListStackScreen");
      return;
    }
    try {
      await processQr(action, {
        onDocumentStore,
        onDocumentView
      });
    } catch (e) {
      alert(e.message || e);
      navigation.navigate("DocumentListStackScreen");
    }
  };

  useEffect(() => {
    initialiseDb({
      db,
      setDb,
      onInitDb
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingView />;
};

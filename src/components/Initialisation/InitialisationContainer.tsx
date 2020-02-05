import React, { useEffect, FunctionComponent } from "react";
import { Document } from "@govtechsg/open-attestation";
import { NavigationProps } from "../../types";
import { useDbContext } from "../../context/db";
import { LoadingView } from "../Loading";
import { processQr } from "../../services/QrProcessor";
import { initialiseDb } from "./utils";

export const InitialisationContainer: FunctionComponent<NavigationProps> = ({
  navigation
}: NavigationProps) => {
  const { db, setDb } = useDbContext();
  const query: string | undefined = navigation.getParam("q");
  const action = `https://action.openattestation.com?q=${query}`;

  const onDocumentStore = (document: Document): void => {
    navigation.navigate("ValidityCheckScreen", {
      document,
      savable: true
    });
  };
  const onDocumentView = (document: Document): void => {
    navigation.navigate("ValidityCheckScreen", { document });
  };

  const onInitDb = async (): Promise<void> => {
    if (!query) {
      navigation.navigate("StackNavigator");
      return;
    }
    try {
      await processQr(action, {
        onDocumentStore,
        onDocumentView
      });
    } catch (e) {
      alert(e.message || e);
      navigation.navigate("StackNavigator");
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

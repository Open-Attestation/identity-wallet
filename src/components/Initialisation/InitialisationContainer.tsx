import React, { useEffect, FunctionComponent } from "react";
import { NavigationProps, OAWrappedDocument } from "../../types";
import { useDbContext } from "../../context/db";
import { LoadingView } from "../Loading";
import { processQr } from "../../services/QrProcessor";
import { reconstructAction, initialiseDb } from "./utils";

export const InitialisationContainer: FunctionComponent<NavigationProps> = ({
  navigation
}: NavigationProps) => {
  const { db, setDb } = useDbContext();
  const documentPayload: string | undefined = navigation.getParam("document");
  const action = reconstructAction({ documentPayload });

  const onDocumentStore = (document: OAWrappedDocument): void => {
    navigation.navigate("ValidityCheckScreen", {
      document,
      savable: true
    });
  };
  const onDocumentView = (document: OAWrappedDocument): void => {
    navigation.navigate("ValidityCheckScreen", { document });
  };

  const onInitDb = async (): Promise<void> => {
    if (!action) {
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

import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { useDbContext } from "../../context/db";
import { DocumentObject, NavigationProps } from "../../types";
import { DocumentRenderer } from "./DocumentRenderer";
import { DocumentDetailsSheet } from "./DocumentDetailsSheet";
import { LoadingView } from "../Loading";
import { ScreenView } from "../ScreenView";

export const LocalDocumentRendererContainer: FunctionComponent<NavigationProps> = ({
  navigation
}) => {
  const id = navigation.getParam("id");
  const { db } = useDbContext();
  const [document, setDocument] = useState<DocumentObject>();
  const [qrCode, setQrCode] = useState<string>("");

  const onGenerateQr = (): void => {
    setQrCode(
      "https://openattestation.com/action?document=%7B%22uri%22:%22https://api.myjson.com/bins/1bpef8%22,%22permittedActions%22:%5B%22STORE%22%5D,%22key%22:%22a93bf5175b276332a9bd4ed43b4ccd2c0968febb18ae1af7f7e5daa30b333e0b%22%7D"
    );
  };

  useEffect(() => {
    const subscription = db!.documents
      .findOne({ id: { $eq: id } })
      .$.subscribe(setDocument);
    return () => subscription.unsubscribe();
  }, [db, id]);

  const output = document ? (
    <View style={{ flex: 1 }}>
      <DocumentRenderer
        document={document.document}
        goBack={() => navigation.goBack()}
      />
      <DocumentDetailsSheet
        document={document.document}
        onGenerateQr={onGenerateQr}
        qrCode={qrCode}
      />
    </View>
  ) : (
    <LoadingView />
  );

  return <ScreenView>{output}</ScreenView>;
};

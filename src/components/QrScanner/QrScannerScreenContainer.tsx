import React, { FunctionComponent, useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationProps, OAWrappedDocument } from "../../types";
import { QrCamera } from "./QrCamera";
import { processQr } from "../../services/QrProcessor";

export const QrScannerScreenContainer: FunctionComponent<NavigationProps> = ({
  navigation
}) => {
  const [scanningDisabled, setScanningDisabled] = useState(false);
  const onDocumentStore = (document: OAWrappedDocument): void => {
    navigation.navigate("ValidityCheckScreen", {
      document,
      savable: true
    });
  };
  const onDocumentView = (document: OAWrappedDocument): void => {
    navigation.navigate("ValidityCheckScreen", { document });
  };
  const onQrData = async (data: string): Promise<void> => {
    if (scanningDisabled) {
      return;
    }
    setScanningDisabled(true);
    try {
      await processQr(data, { onDocumentStore, onDocumentView });
    } catch (e) {
      setScanningDisabled(false);
      alert(e);
    }
  };

  useEffect(() => {
    const blurUnsubscription = navigation.addListener("blur", () => {
      setScanningDisabled(true);
    });
    const focusUnsubscription = navigation.addListener("focus", () => {
      setScanningDisabled(false);
    });
    return () => {
      blurUnsubscription;
      focusUnsubscription;
    };
  }, [navigation]);

  return (
    <>
      <View
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <QrCamera onQrData={onQrData} disabled={scanningDisabled} />
      </View>
    </>
  );
};

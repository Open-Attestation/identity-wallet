import React, { FunctionComponent, useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationProps, OAWrappedDocument } from "../../types";
import { QrCamera } from "./QrCamera";
import { processQr } from "../../services/QrProcessor";
import { BottomNav } from "../Layout/BottomNav";

export interface QrScannerScreenContainer {
  navigation: NavigationProps["navigation"];
}

export const QrScannerScreenContainer: FunctionComponent<QrScannerScreenContainer> = ({
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
    const willBlurSubscription = navigation.addListener("willBlur", () => {
      setScanningDisabled(true);
    });
    const willFocusSubscription = navigation.addListener("willFocus", () => {
      setScanningDisabled(false);
    });
    return () => {
      willBlurSubscription.remove();
      willFocusSubscription.remove();
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
        <BottomNav navigation={navigation} />
      </View>
    </>
  );
};

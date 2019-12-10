import React, { FunctionComponent, useState, useEffect } from "react";
import { View } from "react-native";
import { LoadingView } from "../Loading";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

interface BarCodeScanningResult {
  type: string;
  data: string;
}

export interface QrCamera {
  onQrData: (data: string) => void;
  disabled?: boolean;
  ratio?: string;
}

export const QrCamera: FunctionComponent<QrCamera> = ({
  onQrData,
  disabled = false,
  ratio = "16:9"
}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const askForCameraPermission = async (): Promise<void> => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
  };
  const onBarCodeScanned = (event: BarCodeScanningResult): void => {
    if (event.data && !disabled) {
      onQrData(event.data);
    }
  };
  useEffect(() => {
    askForCameraPermission();
  }, []);
  return hasCameraPermission ? (
    <View style={{ flex: 1 }}>
      {disabled ? (
        <View style={{ width: "100%", height: "100%", position: "absolute" }}>
          <LoadingView />
        </View>
      ) : (
        <Camera
          style={{ flex: 1 }}
          onBarCodeScanned={onBarCodeScanned}
          ratio={ratio}
          testID="qr-camera"
        />
      )}
    </View>
  ) : null;
};

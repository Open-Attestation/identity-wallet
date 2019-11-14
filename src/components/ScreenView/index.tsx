import React, { ReactElement } from "react";
import { SafeAreaView, StatusBar } from "react-native";

interface ScreenView {
  children: ReactElement;
}

export const ScreenView = ({ children }: ScreenView): ReactElement => (
  <SafeAreaView style={{ flex: 1 }}>
    <StatusBar hidden={true} />
    {children}
  </SafeAreaView>
);

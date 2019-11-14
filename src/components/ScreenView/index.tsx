import React, { ReactElement } from "react";
import { SafeAreaView, StatusBar } from "react-native";

interface ScreenView {
  children: ReactElement;
}

const ScreenView = ({ children }: ScreenView): ReactElement => (
  <SafeAreaView>
    <StatusBar hidden={true} />
    {children}
  </SafeAreaView>
);

export default ScreenView;
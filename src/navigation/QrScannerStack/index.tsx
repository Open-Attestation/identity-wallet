import React, { ReactElement } from "react";
import QrScannerScreen from "./QrScannerScreen";
import ValidityCheckScreen from "./ValidityCheckScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../ScreenOptions";

const QrScannerStack = createStackNavigator();

export const QrScannerStackScreen = (): ReactElement => {
  return (
    <QrScannerStack.Navigator
      initialRouteName="QrScannerScreen"
      screenOptions={screenOptions}
    >
      <QrScannerStack.Screen
        name="QrScannerScreen"
        component={QrScannerScreen}
      />
      <QrScannerStack.Screen
        name="ValidityCheckScreen"
        component={ValidityCheckScreen}
      />
    </QrScannerStack.Navigator>
  );
};

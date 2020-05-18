import React, { ReactElement } from "react";
import DocumentListScreen from "./DocumentListScreen";
import LocalDocumentScreen from "./LocalDocumentScreen";
import ScannedDocumentScreen from "./ScannedDocumentScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../ScreenOptions";

const DocumentListStack = createStackNavigator();

export const DocumentListStackScreen = (): ReactElement => {
  return (
    <DocumentListStack.Navigator
      initialRouteName="DocumentListScreen"
      screenOptions={screenOptions}
    >
      <DocumentListStack.Screen
        name="DocumentListScreen"
        component={DocumentListScreen}
      />
      <DocumentListStack.Screen
        name="LocalDocumentScreen"
        component={LocalDocumentScreen}
      />
      <DocumentListStack.Screen
        name="ScannedDocumentScreen"
        component={ScannedDocumentScreen}
      />
    </DocumentListStack.Navigator>
  );
};

import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, View, Platform } from "react-native";
import InitialisationScreen from "./InitialisationScreen";
import SettingsScreen from "./SettingsScreen";
import { DocumentListStackScreen } from "./DocumentListStack";
import { QrScannerStackScreen } from "./QrScannerStack";
import { Linking } from "expo";
import { BottomNav } from "../components/Layout/BottomNav";

const Tab = createBottomTabNavigator();

export const Content = (): ReactElement => {
  const prefix = Linking.makeUrl("/");
  const linking = {
    prefixes: [prefix]
  };

  return (
    <>
      <StatusBar />
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}
      >
        <NavigationContainer linking={linking}>
          <Tab.Navigator
            initialRouteName="InitialisationScreen"
            tabBar={props => <BottomNav {...props} />}
          >
            <Tab.Screen
              name="DocumentListStackScreen"
              component={DocumentListStackScreen}
            />
            <Tab.Screen
              name="QrScannerStackScreen"
              component={QrScannerStackScreen}
            />

            <Tab.Screen name="SettingsScreen" component={SettingsScreen} />

            <Tab.Screen
              name="InitialisationScreen"
              component={InitialisationScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
};

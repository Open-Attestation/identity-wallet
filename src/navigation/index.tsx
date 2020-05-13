import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DbContextProvider } from "../context/db";
import { StackNavigator } from "./StackNavigator";
import { StatusBar, View, Platform } from "react-native";
import { NetworkContextProvider } from "../context/network";
import { ConfigContextProvider } from "../context/config";
import { Linking } from "expo";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";

const prefix = Linking.makeUrl("/");

const App = (): ReactElement => {
  const linking = {
    prefixes: [prefix]
  };

  return (
    <ErrorBoundary>
      <DbContextProvider>
        <NetworkContextProvider>
          <ConfigContextProvider>
            <StatusBar />
            <View
              style={{
                flex: 1,
                paddingTop:
                  Platform.OS === "android" ? StatusBar.currentHeight : 0
              }}
            >
              <NavigationContainer linking={linking}>
                <StackNavigator />
              </NavigationContainer>
            </View>
          </ConfigContextProvider>
        </NetworkContextProvider>
      </DbContextProvider>
    </ErrorBoundary>
  );
};

export default App;

import React, { ReactElement } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { DbContextProvider } from "../context/db";
import StackNavigator from "./StackNavigator";
import { StatusBar, View, Platform } from "react-native";
import InitialisationScreen from "./InitialisationScreen";
import { Linking } from "expo";
import { NetworkContextProvider } from "../context/network";
import { ConfigContextProvider } from "../context/config";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { FontLoader } from "../components/FontLoader";
import { Providers } from "../context/composeProviders";

const SwitchNavigator = createSwitchNavigator(
  {
    InitialisationScreen: { screen: InitialisationScreen, path: "/" },
    StackNavigator
  },
  { initialRouteName: "InitialisationScreen" }
);

const AppContainer = createAppContainer(SwitchNavigator);

const App = (): ReactElement => {
  return (
    <ErrorBoundary>
      <FontLoader>
        <Providers
          providers={[
            ConfigContextProvider,
            DbContextProvider,
            NetworkContextProvider
          ]}
        >
          <StatusBar />
          <View
            style={{
              flex: 1,
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}
          >
            <AppContainer uriPrefix={Linking.makeUrl("/")} />
          </View>
        </Providers>
      </FontLoader>
    </ErrorBoundary>
  );
};

export default App;

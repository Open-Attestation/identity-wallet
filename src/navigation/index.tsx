import React, { ReactElement } from "react";
import { DbContextProvider } from "../context/db";
import { StatusBar, View, Platform } from "react-native";
import { NetworkContextProvider } from "../context/network";
import { ConfigContextProvider } from "../context/config";
import { Content } from "./Content";

const App = (): ReactElement => (
  <DbContextProvider>
    <NetworkContextProvider>
      <ConfigContextProvider>
        <StatusBar />
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
          }}
        >
          <Content />
        </View>
      </ConfigContextProvider>
    </NetworkContextProvider>
  </DbContextProvider>
);

export default App;

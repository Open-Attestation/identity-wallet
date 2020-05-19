import React, { ReactElement } from "react";
import { DbContextProvider } from "../context/db";
import { Content } from "./Content";
import { NetworkContextProvider } from "../context/network";
import { ConfigContextProvider } from "../context/config";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";

const prefix = Linking.makeUrl("/");

const App = (): ReactElement => {
  return (
    <ErrorBoundary>
      <FontLoader>
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
      </FontLoader>
    </ErrorBoundary>
  );
};

export default App;

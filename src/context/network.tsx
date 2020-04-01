import React, { createContext, useContext, FunctionComponent } from "react";
import { Platform } from "react-native";

let useNetInfo: any;
if (Platform.OS !== "web") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const reactNativeCommunity = require("@react-native-community/netinfo");
  useNetInfo = reactNativeCommunity.useNetInfo;
} else {
  useNetInfo = () => ({ isConnected: true });
}

interface NetworkContext {
  isConnected: boolean;
}

export const NetworkContext = createContext<NetworkContext>({
  isConnected: false
});

export const useNetworkContext = (): NetworkContext =>
  useContext<NetworkContext>(NetworkContext);

export const NetworkContextProvider: FunctionComponent = ({ children }) => {
  const { isConnected } = useNetInfo();

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

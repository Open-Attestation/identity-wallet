import React, {
  createContext,
  useContext,
  FunctionComponent,
  useState,
  useEffect
} from "react";
import { AsyncStorage } from "react-native";
import { LoadingView } from "../components/Loading";
import { NetworkTypes, VerifierTypes } from "../types";

export interface Config {
  network: NetworkTypes;
  verifier: VerifierTypes;
}

interface ConfigContext {
  config: Config; // context consumers should never get an undefined config
  setConfigValue: <K extends keyof Config>(key: K, value: Config[K]) => void;
}

const CONFIG_KEY = "CONFIG";
const DEFAULT_CONFIG: Config = {
  network: NetworkTypes.ropsten,
  verifier: VerifierTypes.OpenAttestation
};

const ConfigContext = createContext<ConfigContext>({
  config: DEFAULT_CONFIG,
  setConfigValue: () => {} // eslint-disable-line @typescript-eslint/no-empty-function
});

export const useConfigContext = (): ConfigContext =>
  useContext<ConfigContext>(ConfigContext);

export const ConfigContextProvider: FunctionComponent = ({ children }) => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const setConfigValue: ConfigContext["setConfigValue"] = (key, value) => {
    const nextConfig: Config = {
      ...config,
      [key]: value
    };
    setConfig(nextConfig);
    AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(nextConfig));
  };

  const loadConfigFromStore = async (): Promise<void> => {
    const configStr = await AsyncStorage.getItem(CONFIG_KEY);
    if (configStr) {
      setConfig({
        ...DEFAULT_CONFIG,
        ...JSON.parse(configStr)
      });
    } else {
      await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    loadConfigFromStore();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, setConfigValue }}>
      {isLoaded ? children : <LoadingView />}
    </ConfigContext.Provider>
  );
};

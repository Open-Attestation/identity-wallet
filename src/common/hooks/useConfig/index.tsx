import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

export interface Config {
  network: string;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface useConfig {
  config: Config;
  loaded: boolean;
  setValue: <K extends keyof Config>(key: K, value: Config[K]) => Promise<void>;
}

const CONFIG_KEY = "CONFIG";
const DEFAULT_CONFIG = { network: "ropsten" };

export const useConfig = (): useConfig => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [loaded, setLoaded] = useState(false);

  const setValue: useConfig["setValue"] = async (key, value) => {
    const nextConfig = {
      ...config,
      [key]: value
    };
    setConfig(nextConfig);
    await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(nextConfig));
  };

  const loadConfigFromState = async (): Promise<void> => {
    const configStr = await AsyncStorage.getItem(CONFIG_KEY);
    if (configStr) {
      setConfig(JSON.parse(configStr));
    } else {
      await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
    }
    setLoaded(true);
  };

  useEffect(() => {
    loadConfigFromState();
  }, []);

  return { config, loaded, setValue };
};

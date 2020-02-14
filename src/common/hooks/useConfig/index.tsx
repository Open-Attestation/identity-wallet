import { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { NetworkTypes, VerifierTypes } from "../../../types";

export interface Config {
  network: NetworkTypes;
  verifier: VerifierTypes;
}
interface ConfigHook {
  config: Config;
  loaded: boolean;
  setValue: <K extends keyof Config>(key: K, value: Config[K]) => Promise<void>;
}

const CONFIG_KEY = "CONFIG";
const DEFAULT_CONFIG: Config = {
  network: NetworkTypes.ropsten,
  verifier: VerifierTypes.OpenAttestation
};

export const useConfig = (): ConfigHook => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loaded, setLoaded] = useState(false);

  const setValue: ConfigHook["setValue"] = async (key, value) => {
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
      const storedConfig = JSON.parse(configStr);
      for (const setting in DEFAULT_CONFIG) {
        if (
          storedConfig[setting] === undefined ||
          storedConfig[setting] === null
        ) {
          // @ts-ignore I dunno how to type this part =)
          storedConfig[setting] = DEFAULT_CONFIG[setting];
        }
      }
      setConfig(storedConfig);
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

import React, { FunctionComponent } from "react";
import { Header } from "../Layout/Header";
import { DarkButton } from "../Layout/Buttons/DarkButton";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { BottomNav } from "../Layout/BottomNav";
import { NavigationProps } from "../../types";
import { BuildView } from "./BuildView";
import { fontSize, size } from "../../common/styles";
import { NetworkTypes, VerifierTypes } from "../../types";
import { useConfigContext, Config } from "../../context/config";

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: fontSize(1),
    flex: 1,
    textAlign: "center",
    alignSelf: "center"
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: size(3),
    paddingBottom: size(3),
    justifyContent: "space-between"
  },
  settingsView: {
    paddingVertical: size(3)
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: size(1.5)
  },
  settingsItemDescription: {
    marginRight: size(2),
    fontSize: fontSize(0)
  }
});

export interface Settings extends NavigationProps {
  onResetDocumentData: () => void;
}

export const SettingsView: FunctionComponent<{
  config: Config;
  onResetDocumentData: () => void;
  onToggleNetwork: () => void;
  onToggleVerifier: () => void;
}> = ({ config, onResetDocumentData, onToggleNetwork, onToggleVerifier }) => {
  return (
    <ScrollView style={styles.settingsView}>
      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemDescription}>Delete all documents</Text>
        <DarkButton text="Delete" onPress={onResetDocumentData} />
      </View>
      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemDescription}>
          Switch verification network
        </Text>
        <DarkButton
          text={config.network.toUpperCase()}
          onPress={onToggleNetwork}
        />
      </View>
      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemDescription}>Switch Verifier</Text>
        <DarkButton text={config.verifier} onPress={onToggleVerifier} />
      </View>
    </ScrollView>
  );
};

export const Settings: FunctionComponent<Settings> = ({
  onResetDocumentData,
  navigation
}) => {
  const { config, setConfigValue } = useConfigContext();
  const onToggleNetwork = (): void => {
    setConfigValue(
      "network",
      config.network === NetworkTypes.ropsten
        ? NetworkTypes.mainnet
        : NetworkTypes.ropsten
    );
  };
  const onToggleVerifier = (): void => {
    setConfigValue(
      "verifier",
      config.verifier === VerifierTypes.OpenAttestation
        ? VerifierTypes.OpenCerts
        : VerifierTypes.OpenAttestation
    );
  };
  return (
    <>
      <Header>
        <Text style={styles.headerText}>Settings</Text>
      </Header>
      <View style={styles.contentWrapper}>
        <SettingsView
          onResetDocumentData={onResetDocumentData}
          onToggleNetwork={onToggleNetwork}
          onToggleVerifier={onToggleVerifier}
          config={config}
        />
        <BuildView />
      </View>
      <BottomNav navigation={navigation} />
    </>
  );
};

import React, { FunctionComponent } from "react";
import { Header } from "../Layout/Header";
import { DarkButton } from "../Layout/Buttons/DarkButton";
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { BottomNav } from "../Layout/BottomNav";
import { NavigationProps } from "../../types";
import { BuildView } from "./BuildView";
import { fontSize, size } from "../../common/styles";

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
    padding: size(3),
    justifyContent: "space-between"
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
  onResetDocumentData: () => void;
}> = ({ onResetDocumentData }) => {
  return (
    <ScrollView>
      <View style={styles.settingsItem}>
        <Text style={styles.settingsItemDescription}>Delete all documents</Text>
        <DarkButton text="Delete" onPress={onResetDocumentData} />
      </View>
    </ScrollView>
  );
};

export const Settings: FunctionComponent<Settings> = ({
  onResetDocumentData,
  navigation
}) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <Text style={styles.headerText}>Settings</Text>
        </Header>
        <View style={styles.contentWrapper}>
          <SettingsView onResetDocumentData={onResetDocumentData} />
          <BuildView />
        </View>
      </SafeAreaView>
      <BottomNav navigation={navigation} />
    </>
  );
};

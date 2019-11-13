import React, { ReactElement } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { truncate } from "lodash";
import ScreenView from "../ScreenView";

export interface LicenceListItemProps {
  title: string;
  isVerified: boolean;
  onPress: () => void;
}

export interface VerifiedLabelProps {
  isVerified: boolean;
}

const colorDark = "#4f4f4f";
const colorLight = "#e0e0e0";
const colorLightWRed = "#d09a9a";
const colorVeryLight = "#f2f2f2";

export const VerifiedLabel = ({
  isVerified
}: VerifiedLabelProps): ReactElement => {
  const labelText = isVerified ? "VERIFIED" : "INVALID";
  const backgroundColor = isVerified ? colorLight : colorLightWRed;
  return (
    <View
      style={{
        backgroundColor,
        flexDirection: "row",
        alignItems: "center",
        padding: 5
      }}
    >
      <Feather name="check-circle" />
      <Text style={{ marginLeft: 5 }}>{labelText}</Text>
    </View>
  );
};

export const LicenceListItem = ({
  title,
  isVerified,
  onPress
}: LicenceListItemProps): ReactElement => (
  <TouchableOpacity onPress={onPress} style={{ width: "100%", margin: 5 }}>
    <View
      style={{
        backgroundColor: colorVeryLight,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
      }}
    >
      <Text style={{ color: colorDark, fontWeight: "bold" }}>
        {truncate(title)}
      </Text>
      <VerifiedLabel isVerified={isVerified} />
    </View>
  </TouchableOpacity>
);

interface DocumentItem {
  id: string;
  title: string;
  isVerified: boolean;
}

interface LicenceListProp {
  documents: DocumentItem[];
  navigateToDoc: (documentId: string) => void;
}

export const LicenceList = ({
  documents,
  navigateToDoc
}: LicenceListProp): ReactElement => {
  const renderedLicenceListItem = documents.map(
    (doc): ReactElement => (
      <LicenceListItem
        key={doc.id}
        title={doc.title}
        isVerified={doc.isVerified}
        onPress={(): void => navigateToDoc(doc.id)}
      />
    )
  );
  return (
    <ScrollView style={{ width: "100%", padding: 10, height: "100%" }}>
      {renderedLicenceListItem}
    </ScrollView>
  );
};

export const LicenceListView = ({
  documents,
  navigateToDoc
}: LicenceListProp): ReactElement => {
  return (
    <ScreenView>
      <LicenceList documents={documents} navigateToDoc={navigateToDoc} />
    </ScreenView>
  );
};

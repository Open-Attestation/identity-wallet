import React, { ReactElement } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { truncate } from "lodash";
import ScreenView from "../ScreenView";

export interface DocumentListItemProps {
  title: string;
  isVerified?: boolean;
  lastVerification?: number;
  onPress: () => void;
}

export interface VerifiedLabelProps {
  isVerified?: boolean;
  lastVerification?: number;
}

const colorDark = "#4f4f4f";
const colorLight = "#e0e0e0";
const colorLightWRed = "#d09a9a";
const colorVeryLight = "#f2f2f2";

export const VerifiedLabel = ({
  isVerified,
  lastVerification
}: VerifiedLabelProps): ReactElement => {
  let labelText;
  let iconName;
  let backgroundColor;
  switch (true) {
    case isVerified:
      labelText = "VERIFIED";
      iconName = "check-circle";
      backgroundColor = colorLight;
      break;
    case !isVerified && !lastVerification:
      labelText = "UNKNOWN";
      iconName = "alert-circle";
      backgroundColor = colorLightWRed;
      break;
    default:
      labelText = "INVALID";
      iconName = "x-circle";
      backgroundColor = colorLightWRed;
  }
  return (
    <View
      style={{
        backgroundColor,
        flexDirection: "row",
        alignItems: "center",
        padding: 5
      }}
    >
      <Feather name={iconName} />
      <Text style={{ marginLeft: 5 }}>{labelText}</Text>
    </View>
  );
};

export const DocumentListItem = ({
  title,
  isVerified,
  onPress,
  lastVerification
}: DocumentListItemProps): ReactElement => (
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
      <VerifiedLabel
        isVerified={isVerified}
        lastVerification={lastVerification}
      />
    </View>
  </TouchableOpacity>
);

interface DocumentItem {
  id: string;
  title: string;
  isVerified?: boolean;
  lastVerification?: number;
}

interface DocumentListProp {
  documents: DocumentItem[];
  navigateToDoc: (documentId: string) => void;
}

export const DocumentList = ({
  documents,
  navigateToDoc
}: DocumentListProp): ReactElement => {
  const renderedDocumentListItem = documents.map(
    (doc): ReactElement => (
      <DocumentListItem
        key={doc.id}
        title={doc.title}
        isVerified={doc.isVerified}
        lastVerification={doc.lastVerification}
        onPress={(): void => navigateToDoc(doc.id)}
      />
    )
  );
  return (
    <ScrollView style={{ width: "100%", padding: 10, height: "100%" }}>
      {renderedDocumentListItem}
    </ScrollView>
  );
};

export const DocumentListView = ({
  documents,
  navigateToDoc
}: DocumentListProp): ReactElement => {
  return (
    <ScreenView>
      <DocumentList documents={documents} navigateToDoc={navigateToDoc} />
    </ScreenView>
  );
};

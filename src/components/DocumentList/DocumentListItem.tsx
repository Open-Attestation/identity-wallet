import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import { VerifiedLabel } from "./VerifiedLabel";
import { color, typeScale, spacing } from "../../common/styles";

export interface DocumentListItem {
  title: string;
  isVerified?: boolean;
  lastVerification?: number;
  onPress: () => void;
}

export const DocumentListItem: FunctionComponent<DocumentListItem> = ({
  title,
  isVerified,
  onPress,
  lastVerification
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      minHeight: spacing(6),
      borderRadius: 4,
      marginBottom: spacing(1.5),
      backgroundColor: color("grey", 0),
      borderColor: color("grey", 15),
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: spacing(1),
      paddingVertical: spacing(1)
    }}
    testID="document-list-item"
  >
    <Text
      style={{
        color: color("grey", 40),
        fontWeight: "bold",
        fontSize: typeScale(0),
        paddingHorizontal: spacing(1),
        flexShrink: 1
      }}
    >
      {title}
    </Text>
    {!isVerified && (
      <VerifiedLabel
        isVerified={isVerified}
        lastVerification={lastVerification}
      />
    )}
  </TouchableOpacity>
);

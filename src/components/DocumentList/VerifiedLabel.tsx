import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { color, spacing, typeScale } from "../../common/styles";

export interface VerifiedLabel {
  isVerified?: boolean;
  lastVerification?: number;
}

export const VerifiedLabel: FunctionComponent<VerifiedLabel> = ({
  isVerified,
  lastVerification
}) => {
  let labelText;
  let iconName;
  let labelColor;
  let backgroundColor;
  switch (true) {
    case isVerified:
      labelText = "Verified";
      iconName = "check-circle";
      labelColor = color("green", 30);
      backgroundColor = color("green", 20);
      break;
    case !isVerified && !lastVerification:
      labelText = "Unknown";
      iconName = "alert-circle";
      labelColor = color("grey", 40);
      backgroundColor = color("grey", 10);
      break;
    default:
      labelText = "Invalid";
      iconName = "x-circle";
      labelColor = color("red", 30);
      backgroundColor = color("red", 20);
  }
  return (
    <View
      testID="verified-label"
      style={{
        backgroundColor,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing(1.5),
        paddingVertical: spacing(1),
        borderRadius: 2
      }}
    >
      <Feather name={iconName} size={16} style={{ color: labelColor }} />
      <Text
        style={{
          marginLeft: spacing(1),
          textTransform: "uppercase",
          letterSpacing: 0.5,
          fontWeight: "bold",
          fontSize: typeScale(-2),
          color: labelColor
        }}
      >
        {labelText}
      </Text>
    </View>
  );
};

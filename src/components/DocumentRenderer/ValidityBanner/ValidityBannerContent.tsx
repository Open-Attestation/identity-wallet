import React, { FunctionComponent } from "react";
import { CheckStatus } from "./types";
import { View } from "react-native";

interface ValidityBannerContent {
  checkStatus?: CheckStatus;
  isExpanded?: boolean;
}

export const ValidityBannerContent: FunctionComponent<ValidityBannerContent> = ({
  checkStatus = "checking",
  isExpanded = false,
  children
}) => {
  let backgroundColor;
  switch (checkStatus) {
    case "valid":
      backgroundColor = "#EFFAF4";
      break;
    case "invalid":
      backgroundColor = "#FCF3F3";
      break;
    case "checking":
    case "unknown":
    default:
      backgroundColor = "#FEF9EB";
      break;
  }

  return isExpanded ? (
    <View
      style={{
        padding: 24,
        paddingTop: 8,
        paddingBottom: 12,
        backgroundColor
      }}
      testID="validity-banner-content"
    >
      {children}
    </View>
  ) : null;
};

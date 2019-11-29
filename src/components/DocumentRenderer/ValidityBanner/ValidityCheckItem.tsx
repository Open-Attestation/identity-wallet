import React, { FunctionComponent, ReactNode } from "react";
import { CheckStatus } from "./types";
import { View, Text } from "react-native";
import { ValidityIcon } from "./ValidityIcon";

interface ValidityCheckItem {
  checkStatus: CheckStatus;
  messages: { [status in CheckStatus]?: ReactNode };
}

export const ValidityCheckItem: FunctionComponent<ValidityCheckItem> = ({
  checkStatus,
  messages
}) => {
  let messageColor;
  switch (checkStatus) {
    case CheckStatus.VALID:
      messageColor = "#12964A";
      break;
    case CheckStatus.INVALID:
      messageColor = "#E74343";
      break;
    case CheckStatus.CHECKING:
    default:
      messageColor = "#4F4F4F";
      break;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 3,
        marginBottom: 3
      }}
    >
      <View style={{ marginRight: 8 }}>
        <ValidityIcon checkStatus={checkStatus} size={12} />
      </View>
      <Text
        style={{ color: messageColor, fontSize: 12 }}
        testID="validity-check-message"
      >
        {messages[checkStatus]}
      </Text>
    </View>
  );
};

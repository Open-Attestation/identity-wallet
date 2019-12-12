import React, { FunctionComponent, ReactNode } from "react";
import { View, Text } from "react-native";
import { ValidityIcon } from "./ValidityIcon";
import { CheckStatus } from "../../../constants/verifier";
import { getStatusProps } from "../../../common/verifier";

interface ValidityCheckItem {
  checkStatus: CheckStatus;
  messages: { [status in CheckStatus]: ReactNode };
}

export const ValidityCheckItem: FunctionComponent<ValidityCheckItem> = ({
  checkStatus,
  messages
}) => {
  const { color } = getStatusProps(checkStatus);

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
      <Text style={{ color, fontSize: 12 }} testID="validity-check-message">
        {messages[checkStatus]}
      </Text>
    </View>
  );
};

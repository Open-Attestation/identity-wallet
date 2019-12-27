import React, { FunctionComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import QRIcon from "../../../assets/icons/qr.svg";
import { typeScale, color, shadow, spacing } from "../../common/styles";

interface EmptyDocumentList {
  onAdd: () => void;
}

export const EmptyDocumentList: FunctionComponent<EmptyDocumentList> = ({
  onAdd
}) => (
  <View
    testID="empty-document-list"
    style={{
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <View
      style={{
        width: 240,
        borderRadius: 8,
        backgroundColor: color("grey", 0),
        ...shadow(1)
      }}
    >
      <Text
        style={{
          fontSize: typeScale(2),
          lineHeight: 1.3 * typeScale(2),
          padding: spacing(3)
        }}
      >
        Start by adding a licence to your wallet
      </Text>

      <TouchableOpacity
        testID="scanner-button"
        style={{
          backgroundColor: color("orange", 30),
          flexDirection: "row",
          alignItems: "center",
          height: spacing(6),
          paddingHorizontal: spacing(3),
          borderRadius: 8,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }}
        onPress={onAdd}
      >
        <QRIcon width={20} height={20} fill={color("grey", 40)} />
        <Text
          style={{
            color: color("grey", 40),
            fontWeight: "bold",
            marginLeft: spacing(1.5)
          }}
        >
          Scan to add
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

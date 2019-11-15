import React, { FunctionComponent } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TemplateTabs } from "./TemplateTabs";
import { VERY_LIGHT, DARK } from "../../common/colors";

export interface DocumentRendererHeader extends TemplateTabs {
  goBack?: () => {};
}

export const DocumentRendererHeader: FunctionComponent<DocumentRendererHeader> = ({
  goBack,
  tabs,
  tabSelect,
  activeTabId
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 2,
        borderStyle: "solid",
        borderColor: VERY_LIGHT,
        marginBottom: 5
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (goBack) goBack();
        }}
        style={{ padding: 10, margin: 5 }}
      >
        <Ionicons name="md-arrow-round-back" size={20} color={DARK} />
      </TouchableOpacity>
      <TemplateTabs
        tabs={tabs}
        tabSelect={tabSelect}
        activeTabId={activeTabId}
      />
    </View>
  );
};

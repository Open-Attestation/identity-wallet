// Given a OA document and url, render it with webview
import React, { FunctionComponent } from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { DARK } from "../../common/colors";
export interface Tab {
  id: string;
  label: string;
}

export interface TemplateTabs {
  tabs: Tab[];
  tabSelect: Function;
  activeTabId: string;
}

const inactiveTabStyle: ViewStyle = {
  padding: 10
};

const activeTabStyle: ViewStyle = {
  ...inactiveTabStyle,
  borderBottomColor: DARK,
  borderBottomWidth: 2,
  borderStyle: "solid"
};

export const TemplateTabs: FunctionComponent<TemplateTabs> = ({
  tabs,
  tabSelect,
  activeTabId
}) => {
  if (!tabs) return null;
  const renderedTabs = tabs.map(tab => (
    <TouchableOpacity
      onPress={(): void => tabSelect(tab.id)}
      key={tab.id}
      style={tab.id === activeTabId ? activeTabStyle : inactiveTabStyle}
    >
      <Text style={{ color: DARK }}>{tab.label}</Text>
    </TouchableOpacity>
  ));
  return <View style={{ flexDirection: "row" }}>{renderedTabs}</View>;
};

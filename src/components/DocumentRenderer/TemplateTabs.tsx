import React, { FunctionComponent } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { color, size, fontSize } from "../../common/styles";

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
  paddingHorizontal: size(1),
  marginHorizontal: size(0.5),
  justifyContent: "center",
  borderBottomWidth: 2,
  borderBottomColor: "transparent"
};

const activeTabStyle: ViewStyle = {
  ...inactiveTabStyle,
  borderBottomColor: color("orange", 40)
};

export const TemplateTabs: FunctionComponent<TemplateTabs> = ({
  tabs,
  tabSelect,
  activeTabId
}) => {
  if (!tabs) return null;
  const renderedTabs = tabs.map(tab => (
    <TouchableOpacity
      testID="template-tab"
      onPress={(): void => tabSelect(tab.id)}
      key={tab.id}
      style={tab.id === activeTabId ? activeTabStyle : inactiveTabStyle}
    >
      <Text style={{ color: color("grey", 40), fontSize: fontSize(0) }}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  ));
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ height: "100%" }}
    >
      <View style={{ flexDirection: "row" }}>{renderedTabs}</View>
    </ScrollView>
  );
};

import React, { FunctionComponent, useState, useEffect } from "react";
import { Text } from "react-native";
import { Tab, WebViewFrame as WebViewFrameInterface } from "../WebViewFrame";

const mockTabs: Tab[] = [
  {
    id: "tab-1",
    label: "Tab 1"
  },
  {
    id: "tab-2",
    label: "Tab 2"
  }
];

export const WebViewFrame: FunctionComponent<WebViewFrameInterface> = ({
  setGoToTab,
  setTabs,
  setActiveTabId
}) => {
  const [activeTab, setActiveTab] = useState<string>(mockTabs[0].id);
  useEffect(() => {
    setGoToTab(setActiveTab);
    setTabs(mockTabs);
    setActiveTabId(mockTabs[0].id);
  }, [true]);

  const tabInfo = mockTabs.find(tab => tab.id === activeTab);

  return <Text>{JSON.stringify(tabInfo)}</Text>;
};

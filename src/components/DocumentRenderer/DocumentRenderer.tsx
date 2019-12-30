// Given a OA document and url, render it with webview
import React, { FunctionComponent, useState } from "react";
import { Document } from "@govtechsg/open-attestation";
import { Tab } from "./TemplateTabs";
import { WebViewFrame } from "./WebViewFrame";
import { DocumentRendererHeader } from "./DocumentRendererHeader";
import { color } from "../../common/styles";
import { SafeAreaView } from "react-native";

interface DocumentRenderer {
  document: Document;
  goBack?: () => void;
}

export const DocumentRenderer: FunctionComponent<DocumentRenderer> = ({
  document,
  goBack
}) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [goToTab, setGoToTab] = useState<(tabId: string) => void>();
  const [activeTabId, setActiveTabId] = useState<string>("");

  const tabSelect = (id: string): void => {
    setActiveTabId(id);
    goToTab?.(id);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color("grey", 5) }}>
      <DocumentRendererHeader
        goBack={goBack}
        tabs={tabs}
        tabSelect={tabSelect}
        activeTabId={activeTabId}
      />
      <WebViewFrame
        document={document}
        setGoToTab={setGoToTab}
        setActiveTabId={setActiveTabId}
        setTabs={setTabs}
      />
    </SafeAreaView>
  );
};

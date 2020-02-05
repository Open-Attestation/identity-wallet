// Given a OA document and url, render it with webview
import React, { FunctionComponent, useState } from "react";
import { Tab } from "./TemplateTabs";
import { WebViewFrame } from "./WebViewFrame";
import { DocumentRendererHeader } from "./DocumentRendererHeader";
import { OAWrappedDocument } from "../../types";

interface DocumentRenderer {
  document: OAWrappedDocument;
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
    <>
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
    </>
  );
};

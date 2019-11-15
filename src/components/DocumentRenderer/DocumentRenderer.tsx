// Given a OA document and url, render it with webview
import React, { FunctionComponent, useState } from "react";
import { Document } from "@govtechsg/open-attestation";
import ReactNative, { View } from "react-native";
import { WebViewMessageEvent } from "react-native-webview";
import { Tab } from "./TemplateTabs";
import { WebViewFrame } from "./WebViewFrame";
import { DocumentRendererHeader } from "./DocumentRendererHeader";

const wrapperStyle: ReactNative.ViewStyle = {
  flex: 1,
  justifyContent: "center"
};

interface DocumentRenderer {
  document: Document;
  goBack?: () => {};
}

export const DocumentRenderer: FunctionComponent<DocumentRenderer> = ({
  document,
  goBack
}) => {
  const [template, setTemplate] = useState<Tab[]>([]);
  const [goToTemplate, setGoToTemplate] = useState();
  const [activeTabId, setActiveTabId] = useState();

  const tabSelect = (id: string): void => {
    setActiveTabId(id);
    goToTemplate(id);
  };

  const onTemplateMessageHandler = (event: WebViewMessageEvent): void => {
    const tabs = JSON.parse(event.nativeEvent.data);
    setTemplate(tabs);
    setActiveTabId(tabs[0].id);
  };

  return (
    <View style={wrapperStyle}>
      <DocumentRendererHeader
        goBack={goBack}
        tabs={template}
        tabSelect={tabSelect}
        activeTabId={activeTabId}
      />
      <WebViewFrame
        setGoToTemplate={setGoToTemplate}
        document={document}
        onTemplateMessageHandler={onTemplateMessageHandler}
      />
    </View>
  );
};

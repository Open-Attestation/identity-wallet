// Given a OA document and url, render it with webview
import React, { FunctionComponent, useState } from "react";
import { Document } from "@govtechsg/open-attestation";
import ReactNative, { View, TouchableOpacity } from "react-native";
import { WebViewMessageEvent } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { Tab, TemplateTabs } from "./TemplateTabs";
import { WebViewFrame } from "./WebViewFrame";
import { VERY_LIGHT, DARK } from "../../common/colors";

interface DocumentRendererHeader extends TemplateTabs {
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

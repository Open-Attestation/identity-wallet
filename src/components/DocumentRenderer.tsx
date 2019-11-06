// Given a OA document and url, render it with webview
import React, { useEffect, useRef, useState } from "react";
import { getData } from "@govtechsg/open-attestation";
import ReactNative, {
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { Document } from "@govtechsg/open-attestation";
import { get } from "lodash";
4;
interface IWebViewRef {
  current:
    | {
        injectJavaScript: Function | undefined;
      }
    | undefined;
}

interface ITab {
  id: string;
  label: string;
}

const wrapperStyle: ReactNative.ViewStyle = {
  flex: 1,
  paddingTop: 24,
  justifyContent: "center"
};

const TemplateTabs = ({
  tabs,
  tabSelect
}: {
  tabs: ITab[];
  tabSelect: Function;
}) => {
  // Do not show when there is only one tab
  if (!tabs || tabs.length <= 1) return null;
  const renderedTabs = tabs.map(tab => (
    <TouchableWithoutFeedback onPress={() => tabSelect(tab.id)} key={tab.id}>
      <Text>{tab.label}</Text>
    </TouchableWithoutFeedback>
  ));
  return <View>{renderedTabs}</View>;
};

const DocumentRenderer = ({ document }: { document: Document }) => {
  const data = getData(document);
  const refWebView = useRef();
  const [inject, setInject] = useState();
  const [template, setTemplate] = useState<ITab[]>([]);

  useEffect(() => {
    const { current } = refWebView as IWebViewRef;
    if (current && current.injectJavaScript)
      setInject(() => current.injectJavaScript);
  }, [true]);

  const onTemplateMessageHandler = (event: WebViewMessageEvent) => {
    setTemplate(JSON.parse(event.nativeEvent.data));
  };

  const onTabSelect = (tabIndex: string) => {
    inject(
      `window.openAttestation({type: "SELECT_TEMPLATE", payload: "${tabIndex}"})`
    );
  };

  return (
    <View style={wrapperStyle}>
      <TemplateTabs tabs={template} tabSelect={onTabSelect} />
      <WebView
        ref={refWebView}
        source={{
          uri: get(data, "$template.url")
        }}
        injectedJavaScript={`
          // Render the document
          const documentToRender = ${JSON.stringify(data)};
          const rawDocument = ${JSON.stringify(document)}
          window.openAttestation({type: "RENDER_DOCUMENT", payload: {document: documentToRender, rawDocument}});

          // Retrieve the templates
          const templates = window.openAttestation({type: "GET_TEMPLATES", payload: documentToRender});
          window.ReactNativeWebView.postMessage(JSON.stringify(templates));
        `}
        onMessage={onTemplateMessageHandler}
      />
    </View>
  );
};

export default DocumentRenderer;

import React from "react";
import Storybook from "./storybook";
import { IS_STORYBOOK_VIEW } from "./src/config";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    <WebView
      // originWhitelist={["*"]}
      source={{ uri: "https://google.com/" }}
      style={{ flex: 1, width: "100%" }}
      // javaScriptEnabled={true}
      // injectedJavaScript={`
      //   var documentToRender = ${JSON.stringify(data)};
      //   window.openAttestation.renderDocument(documentToRender);
      // `}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default IS_STORYBOOK_VIEW ? Storybook : App;

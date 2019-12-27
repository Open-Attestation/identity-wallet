import React, { FunctionComponent } from "react";
import { View, ActivityIndicator } from "react-native";
import { DARK } from "../../common/styles/colors";

export const LoadingView: FunctionComponent = () => {
  return (
    <View
      testID="loading-view"
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ActivityIndicator size="large" color={DARK} />
    </View>
  );
};

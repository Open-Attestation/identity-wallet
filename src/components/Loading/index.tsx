import React, { ReactElement } from "react";
import { View, ActivityIndicator } from "react-native";
import { DARK } from "../../common/colors";

export const LoadingView = (): ReactElement => {
  return (
    <View
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

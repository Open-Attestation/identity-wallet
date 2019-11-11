import React, { useEffect } from "react";
import { Text, View } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const LoadingScreen = ({ navigation }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("StackNavigator");
    }, 1000);
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;

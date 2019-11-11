import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationInjectedProps } from "react-navigation";

class LoadingScreen extends Component<NavigationInjectedProps> {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("StackNavigator");
    }, 3000);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

export default LoadingScreen;

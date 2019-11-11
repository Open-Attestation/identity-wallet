import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./MainScreen";

const StackNavigator = createStackNavigator({
  MainScreen: {
    screen: MainScreen
  }
});

export default StackNavigator;

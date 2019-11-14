import { createStackNavigator } from "react-navigation-stack";
import DocumentListScreen from "./DocumentListScreen";

const StackNavigator = createStackNavigator(
  {
    DocumentListScreen: {
      screen: DocumentListScreen
    }
  },
  {
    headerMode: "none"
  }
);

export default StackNavigator;

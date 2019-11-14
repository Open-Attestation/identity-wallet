import { createStackNavigator } from "react-navigation-stack";
import LicenseListScreen from "./LicenseListScreen";

const StackNavigator = createStackNavigator(
  {
    LicenseListScreen: {
      screen: LicenseListScreen
    }
  },
  {
    headerMode: "none"
  }
);

export default StackNavigator;

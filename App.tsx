import "react-native-gesture-handler";
import AppNavigation from "./src/navigation";
import Storybook from "./storybook";
import { IS_STORYBOOK_VIEW } from "./src/config";
import { YellowBox } from "react-native";
import * as Sentry from "sentry-expo";
import Constants from "expo-constants";

if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      enableInExpoDevelopment: true,
      debug: __DEV__
    });
    Sentry.setRelease(Constants.manifest.revisionId!);
}

YellowBox.ignoreWarnings(["Setting a timer"]);

export default IS_STORYBOOK_VIEW ? Storybook : AppNavigation;

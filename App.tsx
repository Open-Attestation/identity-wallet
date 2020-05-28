// Can't find variable error
// https://github.com/stockulus/pouchdb-react-native/issues/109
global.Buffer = global.Buffer || require("buffer").Buffer;

import AppNavigation from "./src/navigation";
import Storybook from "./storybook";
import { IS_STORYBOOK_VIEW } from "./src/config";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default IS_STORYBOOK_VIEW ? Storybook : AppNavigation;

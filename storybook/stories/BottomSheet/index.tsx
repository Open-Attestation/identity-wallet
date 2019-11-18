import React from "react";
import { storiesOf } from "@storybook/react-native";

import { BottomSheet } from "../../../src/components/BottomSheet/BottomSheet";
import { SafeAreaView } from "react-native";

storiesOf("BottomSheet", module).add("BottomSheet", () => (
  <SafeAreaView style={{ flex: 1 }}>
    <BottomSheet />
  </SafeAreaView>
));

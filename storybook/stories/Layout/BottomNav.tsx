import React from "react";
import { storiesOf } from "@storybook/react-native";
import { CenterVerticalDecorator } from "../decorators";
import { BottomNav } from "../../../src/components/Layout/BottomNav";
import { navigation, mockState } from "../mocks/navigation";

storiesOf("Layout", module)
  .addDecorator(CenterVerticalDecorator)
  .add("BottomNav", () => (
    <>
      <BottomNav navigation={navigation} state={mockState} descriptors={{}} />
    </>
  ));

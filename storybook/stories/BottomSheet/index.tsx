import React, { ReactElement, useState, FunctionComponent } from "react";
import { storiesOf } from "@storybook/react-native";

import { BottomSheet } from "../../../src/components/BottomSheet/BottomSheet";
import { View, Button, Text, LayoutChangeEvent } from "react-native";
import { ScreenView } from "../../../src/components/ScreenView";

const Lorem = (): ReactElement => (
  <View>
    <Text>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
      praesentium voluptatum deleniti atque corrupti quos dolores et quas
      molestias excepturi sint occaecati cupiditate non provident, similique
      sunt in culpa qui officia deserunt mollitia animi, id est laborum et
      dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
    </Text>
  </View>
);

const Example: FunctionComponent = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const onHeaderLayout = (event: LayoutChangeEvent): void => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height + 56);
  };

  return (
    <ScreenView>
      <BottomSheet snapPoints={[headerHeight, "80%"]}>
        {openSheet => (
          <View>
            <View
              onLayout={onHeaderLayout}
              style={{
                paddingBottom: 24
              }}
            >
              <Text>Header</Text>
              <Button title="expand" onPress={openSheet} />
            </View>
            <Lorem />
            <Lorem />
          </View>
        )}
      </BottomSheet>
    </ScreenView>
  );
};

storiesOf("BottomSheet", module).add("BottomSheet", () => <Example />);

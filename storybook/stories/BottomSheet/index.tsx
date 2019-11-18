import React, { ReactElement, useState, FunctionComponent } from "react";
import { storiesOf } from "@storybook/react-native";

import { BottomSheet } from "../../../src/components/BottomSheet/BottomSheet";
import {
  SafeAreaView,
  View,
  Button,
  Text,
  LayoutChangeEvent
} from "react-native";

const Lorem = (): ReactElement => (
  <View>
    <Text>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
      praesentium voluptatum deleniti atque corrupti quos dolores et quas
      molestias excepturi sint occaecati cupiditate non provident, similique
      sunt in culpa qui officia deserunt mollitia animi, id est laborum et
      dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
      impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
      assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
      officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
      repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
      tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
      consequatur aut perferendis doloribus asperiores repellat. At vero eos et
      accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
      voluptatum deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati cupiditate non provident, similique sunt in culpa
      qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
      harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
      cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
      maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
      repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
      necessitatibus saepe eveniet ut et voluptates repudiandae sint et
      molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
      delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
      perferendis doloribus asperiores repellat.
    </Text>
  </View>
);

const Example: FunctionComponent = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const onHeaderLayout = (event: LayoutChangeEvent): void => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height + 24);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 96 }}>
      <BottomSheet snapPoints={[headerHeight, "90%"]}>
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
    </SafeAreaView>
  );
};

storiesOf("BottomSheet", module).add("BottomSheet", () => <Example />);

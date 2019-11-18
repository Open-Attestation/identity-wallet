import React, {
  FunctionComponent,
  useRef,
  ReactElement,
  RefObject
} from "react";
import { Text, View, Button } from "react-native";
import BottomSheetBehavior from "reanimated-bottom-sheet";

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

export const BottomSheet: FunctionComponent = () => {
  const bottomSheetRef: RefObject<BottomSheetBehavior> = useRef(null);

  const openSheet = (): null | void =>
    bottomSheetRef.current && bottomSheetRef.current.snapTo(1);

  const renderContent = (): ReactElement => (
    <View
      style={{
        width: "100%",
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: "white",
        padding: 24,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 24,
        marginTop: 32
      }}
    >
      <Button title="expand" onPress={openSheet} />
      <Lorem />
      <Lorem />
    </View>
  );

  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <BottomSheetBehavior
        ref={bottomSheetRef}
        renderContent={renderContent}
        enabledContentTapInteraction={false}
        snapPoints={[200, "90%"]}
      />
    </View>
  );
};

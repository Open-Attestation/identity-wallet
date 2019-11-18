import React, {
  FunctionComponent,
  useRef,
  ReactElement,
  RefObject,
  useEffect
} from "react";
import { View } from "react-native";
import BottomSheetBehavior from "reanimated-bottom-sheet";

interface BottomSheet {
  children: (openSheet: () => null | void) => ReactElement;
  snapPoints?: (number | string)[];
}

export const BottomSheet: FunctionComponent<BottomSheet> = ({
  children,
  snapPoints = ["20%", "100%"]
}) => {
  const bottomSheetRef: RefObject<BottomSheetBehavior> = useRef(null);

  const openSheet = (): null | void =>
    bottomSheetRef.current &&
    bottomSheetRef.current.snapTo(snapPoints.length - 1);

  useEffect(() => {
    bottomSheetRef.current && bottomSheetRef.current.snapTo(0);
  }, [snapPoints]);

  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <BottomSheetBehavior
        ref={bottomSheetRef}
        renderContent={() => (
          <ContentWrapper>{children(openSheet)}</ContentWrapper>
        )}
        enabledContentTapInteraction={false}
        snapPoints={snapPoints}
      />
    </View>
  );
};

const ContentWrapper: FunctionComponent = ({ children }) => (
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
    {children}
  </View>
);

import React, {
  FunctionComponent,
  useRef,
  ReactElement,
  RefObject,
  useEffect
} from "react";
import { View } from "react-native";
import BottomSheetBehavior from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

const { call } = Animated;

const FLICK_THRESHOLD = 0.04;
const OPEN_THRESHOLD = 0.7;
const CLOSE_THRESHOLD = 0.3;

interface BottomSheet {
  children: (openSheet: () => null | void) => ReactElement;
  snapPoints?: (number | string)[];
}

type SheetStatus = "opening" | "closing" | null;

export const BottomSheet: FunctionComponent<BottomSheet> = ({
  children,
  snapPoints = ["20%", "100%"]
}) => {
  const bottomSheetRef: RefObject<BottomSheetBehavior> = useRef(null);

  // Snap to the first point whenever snapPoints changes,
  // this allows snapPoints to be dynamic
  useEffect(() => {
    bottomSheetRef.current && bottomSheetRef.current.snapTo(0);
  }, [snapPoints]);

  const sheetStatus = useRef<SheetStatus>(null);
  const isTransitioning = useRef(false);

  const openSheet = (): null | void => {
    // Ensure that snapTo is not called multiple times
    if (!isTransitioning.current) {
      isTransitioning.current = true;
      bottomSheetRef.current &&
        bottomSheetRef.current.snapTo(snapPoints.length - 1);
    }
  };

  const closeSheet = (): null | void => {
    if (!isTransitioning.current) {
      isTransitioning.current = true;
      bottomSheetRef.current && bottomSheetRef.current.snapTo(0);
    }
  };

  // This is updated by BottomSheetBehavior
  const sheetHiddenPercentage = new Animated.Value(1);

  // Keep track of the previous percentage. This allows us to
  // figure out whether the user's drag action was a quick flick
  const prevSheetHiddenPercentage = useRef(1);

  const handlePercentageChange = ([hiddenPercentage]: ReadonlyArray<
    number
  >): void => {
    const status = sheetStatus.current;
    const changeInHiddenPercentage =
      hiddenPercentage - prevSheetHiddenPercentage.current;

    if (!isTransitioning.current) {
      // Two optimizations have been made:
      // 1. If the user flicks the bottom sheet up or down, it opens and closes accordingly.
      //    The default approach required the user to drag to the halfway point between
      //    the snap points to cause it to open/close.
      // 2. When the user opens the sheet, if the sheet is dragged over a threshold,
      //    the sheet automatically opens. (same thing happens when the sheet is being closed)
      if (
        changeInHiddenPercentage < -FLICK_THRESHOLD ||
        (status === "opening" && hiddenPercentage < OPEN_THRESHOLD)
      ) {
        openSheet();
      } else if (
        changeInHiddenPercentage > FLICK_THRESHOLD ||
        (status === "closing" && hiddenPercentage > CLOSE_THRESHOLD)
      ) {
        closeSheet();
      }
    }

    prevSheetHiddenPercentage.current = hiddenPercentage;
  };

  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <Animated.Code
        exec={call<number>([sheetHiddenPercentage], handlePercentageChange)}
      />
      <BottomSheetBehavior
        ref={bottomSheetRef}
        renderContent={() => (
          <ContentWrapper>{children(openSheet)}</ContentWrapper>
        )}
        enabledContentTapInteraction={false}
        snapPoints={snapPoints}
        callbackNode={sheetHiddenPercentage}
        onOpenStart={() => {
          sheetStatus.current = "opening";
        }}
        onOpenEnd={() => {
          sheetStatus.current = null;
          isTransitioning.current = false;
        }}
        onCloseStart={() => {
          sheetStatus.current = "closing";
        }}
        onCloseEnd={() => {
          sheetStatus.current = null;
          isTransitioning.current = false;
        }}
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

import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useLayoutEffect
} from "react";
import { View } from "react-native";

// eslint-disable-next-line react/display-name
export const Camera = forwardRef<View, { onCameraReady?: () => void }>(
  ({ onCameraReady, ...props }, ref: Ref<any>) => {
    useImperativeHandle(ref, () => ({
      getSupportedRatiosAsync: () => ["4:3", "16:9"]
    }));

    useLayoutEffect(() => {
      onCameraReady?.();
    }, [onCameraReady]);

    return <View testID="qr-camera" ref={ref} {...props}></View>;
  }
);

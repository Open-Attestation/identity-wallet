import React, { forwardRef, Ref } from "react";
import { View } from "react-native";

// eslint-disable-next-line react/display-name
export const Camera = forwardRef((_, ref: Ref<View>) => (
  <View testID="qr-camera" ref={ref}></View>
));

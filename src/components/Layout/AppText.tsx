import React, { FunctionComponent } from "react";
import { TextProps, Text } from "react-native";
import { fontSize, color } from "../../common/styles";

export const AppText: FunctionComponent<TextProps> = ({
  children,
  style,
  ...props
}) => (
  <Text
    style={[
      {
        fontFamily: "brand-regular",
        fontSize: fontSize(0),
        color: color("grey", 70)
      },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

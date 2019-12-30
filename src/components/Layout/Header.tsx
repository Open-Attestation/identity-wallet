import React, { FunctionComponent, ReactNode } from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { color, size } from "../../common/styles";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: size(7),
    width: "100%",
    backgroundColor: color("grey", 0),
    alignItems: "stretch",
    elevation: 4
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: color("grey", 15),
    elevation: 0
  },
  headerBackButton: {
    paddingLeft: size(3),
    paddingRight: size(2),
    justifyContent: "center"
  }
});

export interface HeaderBackButton {
  onPress: () => void;
}

// Corresponding padding on the right header to center an element
// Calculated with HeaderBackButton's padding and font size
// The rendered component may have different offset, see below to have more accurate offset
// https://stackoverflow.com/questions/30203154/get-size-of-a-view-in-react-native
export const RIGHT_OFFSET = 24 * 3;

export const HeaderBackButton: FunctionComponent<HeaderBackButton> = ({
  onPress
}) => {
  return (
    <TouchableOpacity
      testID="header-back-button"
      onPress={onPress}
      style={styles.headerBackButton}
    >
      <Feather name="arrow-left" size={size(3)} color={color("grey", 40)} />
    </TouchableOpacity>
  );
};

export interface Header {
  goBack?: () => void;
  hasBorder?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
}

export const Header: FunctionComponent<Header> = ({
  goBack,
  hasBorder = true,
  children,
  style
}) => (
  <View
    testID="header-bar"
    style={[styles.header, hasBorder && styles.borderBottom, style]}
  >
    {goBack ? <HeaderBackButton onPress={goBack} /> : null}
    {children}
  </View>
);

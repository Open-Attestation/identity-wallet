import React, { FunctionComponent } from "react";
import { Feather } from "@expo/vector-icons";
import QRIcon from "../../../assets/icons/qr.svg";
import { View, TouchableOpacity } from "react-native";
import { color } from "../../common/styles";
import { NavigationProps } from "../../types";
import { replaceRouteFn } from "../../common/navigation";
import { spacing } from "../../common/styles";

export interface NavTab {
  onPress: () => void;
}

export const NavTab: FunctionComponent<NavTab> = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      testID="nav-tab"
      onPress={onPress}
      style={{
        width: 64,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export const BottomNav: FunctionComponent<NavigationProps> = ({
  navigation
}) => {
  const currentRoute = navigation.state.routeName;
  return (
    <View
      testID="bottom-nav"
      style={{
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: color("grey", 0),
        borderColor: color("grey", 10),
        borderWidth: 1,
        borderBottomWidth: 0,
        borderStyle: "solid",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: spacing(7)
      }}
    >
      <NavTab onPress={replaceRouteFn(navigation, "DocumentListScreen")}>
        <Feather
          name="home"
          size={20}
          style={{
            color:
              currentRoute === "DocumentListScreen"
                ? color("orange", 40)
                : color("grey", 30)
          }}
        />
      </NavTab>
      <NavTab onPress={replaceRouteFn(navigation, "QrScannerScreen")}>
        <QRIcon
          width={20}
          height={20}
          fill={
            currentRoute === "QrScannerScreen"
              ? color("orange", 40)
              : color("grey", 30)
          }
        />
      </NavTab>
      <NavTab onPress={replaceRouteFn(navigation, "SettingsScreen")}>
        <Feather
          name="settings"
          size={20}
          style={{
            color:
              currentRoute === "SettingsScreen"
                ? color("orange", 40)
                : color("grey", 30)
          }}
        />
      </NavTab>
    </View>
  );
};

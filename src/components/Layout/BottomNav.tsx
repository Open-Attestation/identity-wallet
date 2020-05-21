import React, { FunctionComponent } from "react";
import { Feather } from "@expo/vector-icons";
import { QRWebIcon } from "../../assets/qr";
import QRIcon from "../../../assets/icons/qr.svg";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform
} from "react-native";
import { color, shadow } from "../../common/styles";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { replaceRouteFn } from "../../common/navigation";
import { size } from "../../common/styles";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: color("grey", 0),
    ...shadow(2)
  },
  bottomNav: {
    width: "100%",
    height: size(8),
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: color("grey", 0),
    borderColor: color("grey", 10),
    borderWidth: 1,
    borderBottomWidth: 0,
    borderStyle: "solid",
    paddingHorizontal: size(7)
  },
  navTab: {
    width: size(8),
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});

export interface NavTab {
  onPress: () => void;
}

export const NavTab: FunctionComponent<NavTab> = ({ children, onPress }) => {
  return (
    <TouchableOpacity testID="nav-tab" onPress={onPress} style={styles.navTab}>
      {children}
    </TouchableOpacity>
  );
};

export const BottomNav: FunctionComponent<BottomTabBarProps> = ({ navigation, state }) => {
  const currentRoute = state.routeNames[state.index];

  const onPress = (screen: string, params: any = false): void => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[state.index].key,
      canPreventDefault: true
    });

    if (currentRoute !== screen && !event.defaultPrevented) {
      if (params) {
        navigation.navigate(screen, params);
      } else {
        navigation.navigate(screen);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View testID="bottom-nav" style={styles.bottomNav}>
        <NavTab onPress={() => onPress("DocumentListStackScreen")}>
          <Feather
            name="home"
            size={size(2.5)}
            style={{
              color:
                currentRoute === "DocumentListStackScreen"
                  ? color("orange", 40)
                  : color("grey", 30)
            }}
          />
        </NavTab>
        <NavTab onPress={() => onPress("QrScannerStackScreen", { screen: "QrScannerScreen" })}>
          {Platform.OS === "web" ? (
            <QRWebIcon
              width={size(2)}
              height={size(2)}
              fill={
                currentRoute === "QrScannerStackScreen"
                  ? color("orange", 40)
                  : color("grey", 30)
              }
            />
          ) : (
              <QRIcon
                width={size(2.5)}
                height={size(2.5)}
                fill={
                  currentRoute === "QrScannerStackScreen"
                    ? color("orange", 40)
                    : color("grey", 30)
                }
              />
            )}
        </NavTab>
        <NavTab onPress={() => onPress("SettingsScreen")}>
          <Feather
            name="settings"
            size={size(2.5)}
            style={{
              color:
                currentRoute === "SettingsScreen"
                  ? color("orange", 40)
                  : color("grey", 30)
            }}
          />
        </NavTab>
      </View>
    </SafeAreaView>
  );
};

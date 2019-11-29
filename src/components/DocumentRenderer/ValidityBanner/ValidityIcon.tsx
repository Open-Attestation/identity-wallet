import React, { FunctionComponent, useRef, useEffect } from "react";
import { CheckStatus } from "./types";
import { Animated, Easing } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

interface ValidityIcon {
  checkStatus: CheckStatus;
  size?: number;
}

export const ValidityIcon: FunctionComponent<ValidityIcon> = ({
  checkStatus,
  size = 14
}) => {
  const rotationAnimation = useRef(new Animated.Value(0));
  const animationTiming = useRef<Animated.CompositeAnimation>();

  useEffect(() => {
    animationTiming.current = Animated.timing(rotationAnimation.current, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    });
  });

  useEffect(() => {
    if (animationTiming.current) {
      if (checkStatus === CheckStatus.CHECKING) {
        Animated.loop(animationTiming.current).start();
      } else {
        animationTiming.current.stop();
        rotationAnimation.current.setValue(0);
      }
    }
  }, [checkStatus]);

  let status;
  switch (checkStatus) {
    case CheckStatus.VALID:
      status = {
        iconCategory: Feather,
        iconName: "check-circle",
        iconColor: "#12964A"
      };
      break;
    case CheckStatus.INVALID:
      status = {
        iconCategory: Feather,
        iconName: "x-circle",
        iconColor: "#E74343"
      };
      break;
    case CheckStatus.CHECKING:
    default:
      status = {
        iconCategory: AntDesign,
        iconName: "loading2",
        iconColor: "#828282"
      };
      break;
  }

  return (
    <Animated.View
      style={{
        height: size,
        width: size,
        transform: [
          {
            rotate: rotationAnimation.current.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "360deg"]
            })
          }
        ]
      }}
    >
      <status.iconCategory
        name={status.iconName}
        size={size}
        color={status.iconColor}
      />
    </Animated.View>
  );
};

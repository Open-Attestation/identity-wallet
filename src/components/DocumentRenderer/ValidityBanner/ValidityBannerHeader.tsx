import React, { FunctionComponent, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { CheckStatus } from "./types";
import { ValidityIcon } from "./ValidityIcon";

interface ValidityBannerHeader {
  checkStatus?: CheckStatus;
  isExpanded?: boolean;
  progress?: number;
  onPress: () => void;
}

export const ValidityBannerHeader: FunctionComponent<ValidityBannerHeader> = ({
  checkStatus = CheckStatus.CHECKING,
  isExpanded = false,
  progress = 0,
  onPress
}) => {
  let status;
  switch (checkStatus) {
    case CheckStatus.VALID:
      status = {
        label: "Valid",
        labelColor: "#12964A",
        backgroundColor: "#DAF9E7"
      };
      break;
    case CheckStatus.INVALID:
      status = {
        label: "Invalid",
        labelColor: "#E74343",
        backgroundColor: "#FCE7E7"
      };
      break;
    case CheckStatus.CHECKING:
    default:
      status = {
        label: "Verifying...",
        labelColor: "#4F4F4F",
        backgroundColor: "#FDF2CE"
      };
      break;
  }

  const [showProgressBar, setShowProgressBar] = useState(true);
  useEffect(() => {
    let cancelled = false;
    if (progress === 1) {
      // Hides the progress bar after some time
      setTimeout(() => {
        if (!cancelled) {
          setShowProgressBar(false);
        }
      }, 300);
    } else {
      setShowProgressBar(true);
    }
    return () => {
      cancelled = true;
    };
  }, [progress]);

  return (
    <View
      style={{ position: "relative", backgroundColor: status.backgroundColor }}
    >
      <View
        style={{
          backgroundColor: status.labelColor,
          height: showProgressBar ? 1 : 0,
          width: `${progress * 100}%`,
          position: "absolute",
          top: -1
        }}
      />

      <RectButton
        style={{
          width: "100%",
          height: 44,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 24,
          paddingRight: 24
        }}
        onPress={onPress}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <ValidityIcon checkStatus={checkStatus} size={20} />
          <Text
            style={{
              color: status.labelColor,
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 0.7,
              marginLeft: 10
            }}
            testID="validity-header-label"
          >
            {status.label}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Feather
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={16}
            color="#4f4f4f"
            testID="validity-header-icon"
          />
        </View>
      </RectButton>
    </View>
  );
};

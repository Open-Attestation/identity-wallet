import React, { FunctionComponent, useState } from "react";
import { View, Text } from "react-native";
import { ValidityBannerHeader } from "./ValidityBannerHeader";
import { ValidityBannerContent } from "./ValidityBannerContent";
import { ValidityCheckItem } from "./ValidityBannerCheckItem";
import { CheckStatus, CHECK_MESSAGES } from "../constants";
import { fontSize, color } from "../../../common/styles";

const calculateProgress: (...args: CheckStatus[]) => number = (...args) =>
  args.filter(check => check !== CheckStatus.CHECKING).length / args.length;

interface ValidityBanner {
  tamperedCheck: CheckStatus;
  issuedCheck: CheckStatus;
  revokedCheck: CheckStatus;
  identityCheck: CheckStatus;
  overallValidity: CheckStatus;
  initialIsExpanded?: boolean;
  isConnected?: boolean;
}

export const ValidityBanner: FunctionComponent<ValidityBanner> = ({
  tamperedCheck,
  issuedCheck,
  revokedCheck,
  identityCheck,
  overallValidity,
  initialIsExpanded = false,
  isConnected = true
}) => {
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);

  return (
    <View testID="validity-banner">
      <ValidityBannerHeader
        isConnected={isConnected}
        checkStatus={overallValidity}
        isExpanded={isExpanded}
        progress={calculateProgress(
          tamperedCheck,
          issuedCheck,
          revokedCheck,
          identityCheck
        )}
        onPress={() => setIsExpanded(prev => !prev)}
      />
      <ValidityBannerContent
        isConnected={isConnected}
        checkStatus={overallValidity}
        isExpanded={isExpanded}
      >
        {isConnected ? (
          <>
            <ValidityCheckItem
              checkStatus={tamperedCheck}
              messages={CHECK_MESSAGES.TAMPERED_CHECK}
            />
            <ValidityCheckItem
              checkStatus={issuedCheck}
              messages={CHECK_MESSAGES.ISSUED_CHECK}
            />
            <ValidityCheckItem
              checkStatus={revokedCheck}
              messages={CHECK_MESSAGES.REVOKED_CHECK}
            />
            <ValidityCheckItem
              checkStatus={identityCheck}
              messages={CHECK_MESSAGES.ISSUER_CHECK}
            />
          </>
        ) : (
          <Text
            style={{ color: color("grey", 30), fontSize: fontSize(-2) }}
            testID="offline-message"
          >
            Validity checks require an internet connection
          </Text>
        )}
      </ValidityBannerContent>
    </View>
  );
};

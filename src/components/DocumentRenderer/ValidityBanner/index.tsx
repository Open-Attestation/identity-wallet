import React, { FunctionComponent, useState } from "react";
import { View, Text } from "react-native";
import { ValidityBannerHeader } from "./ValidityBannerHeader";
import { ValidityBannerContent } from "./ValidityBannerContent";
import { ValidityCheckItem } from "./ValidityCheckItem";
import { CheckStatus } from "./types";

export * from "./types";

const MESSAGES = {
  TAMPERED_CHECK: {
    [CheckStatus.CHECKING]: (
      <Text>Checking if document has been tampered with</Text>
    ),
    [CheckStatus.INVALID]: <Text>Document has been tampered with</Text>,
    [CheckStatus.VALID]: <Text>Document has not been tampered with</Text>
  },
  ISSUED_CHECK: {
    [CheckStatus.CHECKING]: <Text>Checking if document was issued</Text>,
    [CheckStatus.INVALID]: <Text>Document was not issued</Text>,
    [CheckStatus.VALID]: <Text>Document was issued</Text>
  },
  REVOKED_CHECK: {
    [CheckStatus.CHECKING]: <Text>Checking if document has been revoked</Text>,
    [CheckStatus.INVALID]: <Text>Document has been revoked</Text>,
    [CheckStatus.VALID]: <Text>Document has not been revoked</Text>
  },
  ISSUER_CHECK: {
    [CheckStatus.CHECKING]: <Text>{"Checking the document's issuer"}</Text>,
    [CheckStatus.INVALID]: (
      <Text>{"Document's issuer may not be who they say they are"}</Text>
    ),
    [CheckStatus.VALID]: <Text>{"Document's issuer has been identified"}</Text>
  }
};

const getOverallValidity: (...args: CheckStatus[]) => CheckStatus = (
  ...args
) => {
  if (args.some(check => check === CheckStatus.INVALID)) {
    return CheckStatus.INVALID;
  } else if (args.every(check => check === CheckStatus.VALID)) {
    return CheckStatus.VALID;
  } else {
    return CheckStatus.CHECKING;
  }
};

const calculateProgress: (...args: CheckStatus[]) => number = (...args) =>
  args.filter(check => check !== CheckStatus.CHECKING).length / args.length;

interface ValidityBanner {
  tamperedCheck: CheckStatus;
  issuedCheck: CheckStatus;
  revokedCheck: CheckStatus;
  issuerCheck: CheckStatus;
  initialIsExpanded?: boolean;
}

export const ValidityBanner: FunctionComponent<ValidityBanner> = ({
  tamperedCheck,
  issuedCheck,
  revokedCheck,
  issuerCheck,
  initialIsExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);
  const overallValidity = getOverallValidity(
    tamperedCheck,
    issuedCheck,
    revokedCheck,
    issuerCheck
  );

  return (
    <View>
      <ValidityBannerHeader
        checkStatus={overallValidity}
        isExpanded={isExpanded}
        progress={calculateProgress(
          tamperedCheck,
          issuedCheck,
          revokedCheck,
          issuerCheck
        )}
        onPress={() => setIsExpanded(prev => !prev)}
      />
      <ValidityBannerContent
        checkStatus={overallValidity}
        isExpanded={isExpanded}
      >
        <ValidityCheckItem
          checkStatus={tamperedCheck}
          messages={MESSAGES.TAMPERED_CHECK}
        />
        <ValidityCheckItem
          checkStatus={issuedCheck}
          messages={MESSAGES.ISSUED_CHECK}
        />
        <ValidityCheckItem
          checkStatus={revokedCheck}
          messages={MESSAGES.REVOKED_CHECK}
        />
        <ValidityCheckItem
          checkStatus={issuerCheck}
          messages={MESSAGES.ISSUER_CHECK}
        />
      </ValidityBannerContent>
    </View>
  );
};

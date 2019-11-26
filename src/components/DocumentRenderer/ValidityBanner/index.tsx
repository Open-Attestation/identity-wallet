import React, { FunctionComponent, useState } from "react";
import { View, Text } from "react-native";
import { ValidityBannerHeader } from "./ValidityBannerHeader";
import { ValidityBannerContent } from "./ValidityBannerContent";
import { ValidityCheckItem } from "./ValidityCheckItem";
import { CheckStatus } from "./types";

export * from "./types";

const getOverallValidity: (...args: CheckStatus[]) => CheckStatus = (
  ...args
) => {
  if (args.some(check => check === "invalid")) {
    return "invalid";
  } else if (args.some(check => check === "checking")) {
    return "checking";
  } else if (args.every(check => check === "valid")) {
    return "valid";
  } else {
    return "unknown";
  }
};

const calculateProgress: (...args: CheckStatus[]) => number = (...args) => {
  return args.filter(check => check !== "checking").length / args.length;
};

interface ValidityBanner {
  tamperedCheck: CheckStatus;
  issuedCheck: CheckStatus;
  revokedCheck: CheckStatus;
  issuerCheck: CheckStatus;
}

export const ValidityBanner: FunctionComponent<ValidityBanner> = ({
  tamperedCheck,
  issuedCheck,
  revokedCheck,
  issuerCheck
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
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
          messages={{
            checking: <Text>Checking if document has been tampered</Text>,
            invalid: <Text>Document has been tampered with</Text>,
            valid: <Text>Document has not been tampered with</Text>,
            unknown: (
              <Text>
                {"Couldn't determine if document has been tampered with"}
              </Text>
            )
          }}
        />

        <ValidityCheckItem
          checkStatus={issuedCheck}
          messages={{
            checking: <Text>Checking if document was issued</Text>,
            invalid: <Text>Document was not issued</Text>,
            valid: <Text>Document was issued</Text>,
            unknown: <Text>{"Couldn't determine if document was issued"}</Text>
          }}
        />

        <ValidityCheckItem
          checkStatus={revokedCheck}
          messages={{
            checking: <Text>Checking if document was revoked</Text>,
            invalid: <Text>Document has been revoked</Text>,
            valid: <Text>Document has not been revoked</Text>,
            unknown: <Text>{"Couldn't determine if document was revoked"}</Text>
          }}
        />

        <ValidityCheckItem
          checkStatus={issuerCheck}
          messages={{
            checking: <Text>{"Checking the document's issuer"}</Text>,
            invalid: (
              <Text>
                {"Document's issuer may not be who they say they are"}
              </Text>
            ),
            valid: <Text>{"Document's issuer has been identified"}</Text>,
            unknown: (
              <Text>{"Couldn't determine if document&apos;s issuer"}</Text>
            )
          }}
        />
      </ValidityBannerContent>
    </View>
  );
};

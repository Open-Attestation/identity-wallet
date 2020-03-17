// TODO - actual validity card failing

import React, { useState, useEffect, FunctionComponent, useRef } from "react";
import { storiesOf } from "@storybook/react-native";
import { CenterDecorator } from "../decorators";
import { View, Button, Text, ScrollView, SafeAreaView } from "react-native";
import sampleDoc from "../../../fixtures/demo-oc.json";
import { useDocumentVerifier } from "../../../src/common/hooks/useDocumentVerifier";
import { CheckStatus, ValidityCard } from "../../../src/components/Validity";

const ValidChecksStory: FunctionComponent = () => {
  const [tamperedCheck, setTamperedCheck] = useState(CheckStatus.CHECKING);
  const [issuedCheck, setIssuedCheck] = useState(CheckStatus.CHECKING);
  const [revokedCheck, setRevokedCheck] = useState(CheckStatus.CHECKING);
  const [identityCheck, setIdentityCheck] = useState(CheckStatus.CHECKING);
  const [overallValidity, setOverallValidity] = useState(CheckStatus.CHECKING);

  const [progress, setProgress] = useState<"stopped" | "started">("stopped");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const start = (): void => {
    timers.current.push(
      setTimeout(() => {
        setTamperedCheck(CheckStatus.VALID);
      }, 1000)
    );
    timers.current.push(
      setTimeout(() => {
        setIssuedCheck(CheckStatus.VALID);
      }, 2300)
    );
    timers.current.push(
      setTimeout(() => {
        setRevokedCheck(CheckStatus.VALID);
      }, 1500)
    );
    timers.current.push(
      setTimeout(() => {
        setIdentityCheck(CheckStatus.VALID);
      }, 2600)
    );
    timers.current.push(
      setTimeout(() => {
        setOverallValidity(CheckStatus.VALID);
      }, 2600)
    );
  };

  const reset = (): void => {
    setTamperedCheck(CheckStatus.CHECKING);
    setIssuedCheck(CheckStatus.CHECKING);
    setRevokedCheck(CheckStatus.CHECKING);
    setIdentityCheck(CheckStatus.CHECKING);
    setOverallValidity(CheckStatus.CHECKING);
  };

  useEffect(() => {
    const timersCopy: ReturnType<typeof setTimeout>[] = timers.current;
    timersCopy.forEach(timer => clearTimeout(timer));
    if (progress === "stopped") {
      reset();
    } else if (progress === "started") {
      start();
    }

    return () => {
      timersCopy.forEach(timer => clearTimeout(timer));
    };
  }, [progress]);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <ValidityCard
        tamperedCheck={tamperedCheck}
        issuedCheck={issuedCheck}
        revokedCheck={revokedCheck}
        identityCheck={identityCheck}
        overallValidity={overallValidity}
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 8,
          justifyContent: "space-between",
          alignSelf: "center",
          width: "40%"
        }}
      >
        <Button title="Start" onPress={() => setProgress("started")} />
        <Button title="Reset" onPress={() => setProgress("stopped")} />
      </View>
      <Text style={{ marginTop: 8, alignSelf: "center" }}>{progress}</Text>
    </View>
  );
};

const InvalidChecksStory: FunctionComponent = () => {
  const [tamperedCheck, setTamperedCheck] = useState(CheckStatus.CHECKING);
  const [issuedCheck, setIssuedCheck] = useState(CheckStatus.CHECKING);
  const [revokedCheck, setRevokedCheck] = useState(CheckStatus.CHECKING);
  const [identityCheck, setIdentityCheck] = useState(CheckStatus.CHECKING);
  const [overallValidity, setOverallValidity] = useState(CheckStatus.CHECKING);

  const [progress, setProgress] = useState<"stopped" | "started">("stopped");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const start = (): void => {
    timers.current.push(
      setTimeout(() => {
        setTamperedCheck(CheckStatus.VALID);
      }, 1000)
    );
    timers.current.push(
      setTimeout(() => {
        setIssuedCheck(CheckStatus.INVALID);
      }, 2600)
    );
    timers.current.push(
      setTimeout(() => {
        setRevokedCheck(CheckStatus.INVALID);
      }, 2300)
    );
    timers.current.push(
      setTimeout(() => {
        setIdentityCheck(CheckStatus.VALID);
      }, 1500)
    );
    timers.current.push(
      setTimeout(() => {
        setOverallValidity(CheckStatus.INVALID);
      }, 2600)
    );
  };

  const reset = (): void => {
    setTamperedCheck(CheckStatus.CHECKING);
    setIssuedCheck(CheckStatus.CHECKING);
    setRevokedCheck(CheckStatus.CHECKING);
    setIdentityCheck(CheckStatus.CHECKING);
    setOverallValidity(CheckStatus.CHECKING);
  };

  useEffect(() => {
    const timersCopy: ReturnType<typeof setTimeout>[] = timers.current;
    timersCopy.forEach(timer => clearTimeout(timer));
    if (progress === "stopped") {
      reset();
    } else if (progress === "started") {
      start();
    }

    return () => {
      timersCopy.forEach(timer => clearTimeout(timer));
    };
  }, [progress]);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <ValidityCard
        tamperedCheck={tamperedCheck}
        issuedCheck={issuedCheck}
        revokedCheck={revokedCheck}
        identityCheck={identityCheck}
        overallValidity={overallValidity}
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 8,
          justifyContent: "space-between",
          alignSelf: "center",
          width: "40%"
        }}
      >
        <Button title="Start" onPress={() => setProgress("started")} />
        <Button title="Reset" onPress={() => setProgress("stopped")} />
      </View>
      <Text style={{ marginTop: 8, alignSelf: "center" }}>{progress}</Text>
    </View>
  );
};

const ActualChecksStory: FunctionComponent = () => {
  const {
    statuses: {
      tamperedCheck,
      issuedCheck,
      revokedCheck,
      identityCheck,
      overallValidity
    },
    verify
  } = useDocumentVerifier();

  useEffect(() => {
    verify(sampleDoc as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <ValidityCard
        tamperedCheck={tamperedCheck}
        issuedCheck={issuedCheck}
        revokedCheck={revokedCheck}
        identityCheck={identityCheck}
        overallValidity={overallValidity}
      />
    </View>
  );
};

storiesOf("ValidityCard", module).add("Variants", () => (
  <SafeAreaView>
    <ScrollView>
      <View style={{ alignItems: "center", paddingVertical: 64 }}>
        <ValidityCard
          tamperedCheck={CheckStatus.CHECKING}
          issuedCheck={CheckStatus.CHECKING}
          revokedCheck={CheckStatus.CHECKING}
          identityCheck={CheckStatus.CHECKING}
          overallValidity={CheckStatus.CHECKING}
        />
        <ValidityCard
          tamperedCheck={CheckStatus.CHECKING}
          issuedCheck={CheckStatus.CHECKING}
          revokedCheck={CheckStatus.CHECKING}
          identityCheck={CheckStatus.VALID}
          overallValidity={CheckStatus.CHECKING}
        />
        <ValidityCard
          tamperedCheck={CheckStatus.INVALID}
          issuedCheck={CheckStatus.CHECKING}
          revokedCheck={CheckStatus.CHECKING}
          identityCheck={CheckStatus.VALID}
          overallValidity={CheckStatus.INVALID}
        />
        <ValidityCard
          tamperedCheck={CheckStatus.VALID}
          issuedCheck={CheckStatus.VALID}
          revokedCheck={CheckStatus.VALID}
          identityCheck={CheckStatus.VALID}
          overallValidity={CheckStatus.VALID}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
));

storiesOf("ValidityCard", module)
  .addDecorator(CenterDecorator)
  .add("Valid flow", () => <ValidChecksStory />)
  .add("Invalid flow", () => <InvalidChecksStory />)
  .add("Actual flow", () => <ActualChecksStory />);

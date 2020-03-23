import React, { FunctionComponent, useEffect } from "react";
import { useDocumentVerifier } from "../../common/hooks/useDocumentVerifier";
import { NavigationProps, OAWrappedDocument } from "../../types";
import { Header } from "../Layout/Header";
import { CheckStatus } from "../Validity/constants";
import { View, SafeAreaView } from "react-native";
import { ValidityCard } from "../Validity/ValidityCard";
import { replaceRouteFn } from "../../common/navigation";

export const ValidityCheckScreenContainer: FunctionComponent<NavigationProps> = ({
  navigation
}) => {
  const document: OAWrappedDocument = navigation.getParam("document");
  const isSavable: boolean = navigation.getParam("savable");
  const { statuses, verify, issuerName, verifierType } = useDocumentVerifier();

  useEffect(() => {
    verify(document);
  }, [document, verify]);

  useEffect(() => {
    let cancelled = false;
    if (statuses.overallValidity === CheckStatus.VALID) {
      setTimeout(() => {
        if (!cancelled) {
          replaceRouteFn(navigation, "ScannedDocumentScreen", {
            document,
            savable: isSavable,
            statuses,
            issuerName,
            verifierType
          })();
        }
      }, 500);
    }
    return () => {
      cancelled = true;
    };
  }, [document, isSavable, issuerName, navigation, statuses, verifierType]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        goBack={() => navigation.goBack()}
        hasShadow={false}
        style={{
          backgroundColor: "transparent"
        }}
      />
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ValidityCard {...statuses} />
      </View>
    </SafeAreaView>
  );
};

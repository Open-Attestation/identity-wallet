import React, { FunctionComponent, useEffect } from "react";
import { useDocumentVerifier } from "../../hooks/useDocumentVerifier";
import { ValidityCheckScreenProps, OAWrappedDocument } from "../../types";
import { Header } from "../Layout/Header";
import { CheckStatus } from "../Validity/constants";
import { View, SafeAreaView } from "react-native";
import { ValidityCard } from "../Validity/ValidityCard";

export const ValidityCheckScreenContainer: FunctionComponent<ValidityCheckScreenProps> = ({
  navigation,
  route
}) => {
  const document: OAWrappedDocument = route.params.document;
  const isSavable: boolean = route.params.savable ?? false;
  const { statuses, verify, issuerName, verifierType } = useDocumentVerifier();

  useEffect(() => {
    verify(document);
  }, [document, verify]);

  useEffect(() => {
    let cancelled = false;
    if (statuses.overallValidity === CheckStatus.VALID) {
      setTimeout(() => {
        if (!cancelled) {
          navigation.navigate("DocumentListStackScreen", {
            screen: "ScannedDocumentScreen",
            params: {
              document,
              savable: isSavable,
              statuses,
              issuerName,
              verifierType
            }
          });
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

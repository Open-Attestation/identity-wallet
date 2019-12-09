import React, { FunctionComponent, useEffect } from "react";
import { useDocumentVerifier } from "../../common/hooks/useDocumentVerifier";
import { NavigationProps } from "../../types";
import { SignedDocument } from "@govtechsg/open-attestation";
import { ScreenView } from "../ScreenView";
import { ValidityBanner } from "../DocumentRenderer/ValidityBanner";
import { Header } from "../Layout/Header";
import { CheckStatus } from "../../constants/verifier";

export const ValidityCheckScreen: FunctionComponent<NavigationProps> = ({
  navigation
}) => {
  const document: SignedDocument = navigation.getParam("document");
  const isSavable: boolean = navigation.getParam("savable");
  const verificationStatuses = useDocumentVerifier(document as SignedDocument);

  useEffect(() => {
    if (verificationStatuses.overallValidity === CheckStatus.VALID) {
      setTimeout(() => {
        navigation.navigate("ScannedDocumentScreen", {
          document,
          savable: isSavable,
          verificationStatuses
        });
      }, 500);
    }
  }, [document, isSavable, navigation, verificationStatuses]);

  return (
    <ScreenView>
      <Header goBack={() => navigation.goBack()} />
      <ValidityBanner {...verificationStatuses} initialIsExpanded={true} />
    </ScreenView>
  );
};

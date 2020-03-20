import React, { FunctionComponent } from "react";
import {
  DocumentProperties,
  NavigationProps,
  OAWrappedDocument
} from "../../types";
import { DocumentRenderer } from "./DocumentRenderer";
import { ScannedDocumentActionSheet } from "./ScannedDocumentActionSheet";
import { useDbContext } from "../../context/db";
import { resetRouteFn } from "../../common/navigation";
import { CheckStatus } from "../Validity";
import { VerificationStatuses } from "../../common/hooks/useDocumentVerifier";
import { View } from "react-native";
import { VerifierTypes } from "../../types";

export const ScannedDocumentRendererContainer: FunctionComponent<NavigationProps> = ({
  navigation
}) => {
  const { db } = useDbContext();
  const document: OAWrappedDocument = navigation.getParam("document");
  const isSavable: boolean = navigation.getParam("savable");
  const statuses: VerificationStatuses = navigation.getParam("statuses");
  const issuerName: string = navigation.getParam("issuerName");
  const verifierType: VerifierTypes = navigation.getParam("verifierType");
  const id = document.signature.targetHash;
  const navigateToDocument = resetRouteFn(navigation, "LocalDocumentScreen", {
    id
  });

  const onSave = async (): Promise<void> => {
    try {
      const documentToInsert: DocumentProperties = {
        id,
        created: Date.now(),
        document,
        verified: Date.now(),
        isVerified: statuses.overallValidity === CheckStatus.VALID,
        verifierType,
        issuerName
      };
      await db!.documents.insert(documentToInsert);
      navigateToDocument();
    } catch (e) {
      if (e?.parameters?.pouchDbError?.name === "conflict") {
        alert("The document has already been saved");
        return;
      }
      throw e;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DocumentRenderer
        document={document}
        goBack={() => navigation.goBack()}
      />
      <ScannedDocumentActionSheet
        verificationStatuses={statuses}
        issuedBy={issuerName}
        isSavable={isSavable}
        onCancel={() => navigation.goBack()}
        onDone={() => navigation.goBack()}
        onSave={onSave}
      />
    </View>
  );
};

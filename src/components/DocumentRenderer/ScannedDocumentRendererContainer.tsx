import React, { FunctionComponent } from "react";
import { NavigationProps, DocumentObject } from "../../types";
import { DocumentRenderer } from "./DocumentRenderer";
import { ScreenView } from "../ScreenView";
import { Document, getData } from "@govtechsg/open-attestation";
import { ScannedDocumentActionSheet } from "./ScannedDocumentActionSheet";
import { useDbContext } from "../../context/db";
import { get } from "lodash";
import { resetRouteFn } from "../../common/navigation";

export const ScannedDocumentRendererContainer: FunctionComponent<NavigationProps> = ({
  navigation
}) => {
  const { db } = useDbContext();
  const document: Document = navigation.getParam("document");
  const isSavable: boolean = navigation.getParam("savable");
  const documentData = getData(document);
  const id = get(document, "signature.targetHash");
  const issuedBy =
    documentData.issuers[0]?.identityProof?.location ||
    "Issuer's identity not found";
  const navigateToDocument = resetRouteFn(navigation, "LocalDocumentScreen", {
    id
  });
  const onSave = async (): Promise<void> => {
    try {
      const documentToInsert: DocumentObject = {
        id,
        created: Date.now(),
        document,
        verified: Date.now(),
        isVerified: true
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
    <>
      <ScreenView>
        <DocumentRenderer
          document={document}
          goBack={() => navigation.goBack()}
        />
      </ScreenView>
      <ScannedDocumentActionSheet
        issuedBy={issuedBy}
        isSavable={isSavable}
        onCancel={() => navigation.goBack()}
        onDone={() => navigation.goBack()}
        onSave={onSave}
      />
    </>
  );
};

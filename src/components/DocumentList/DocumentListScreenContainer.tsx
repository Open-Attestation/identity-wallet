import React, { FunctionComponent, useState, useEffect } from "react";
import { DocumentObject, NavigationProps, VerifierTypes } from "../../types";
import { getData } from "@govtechsg/open-attestation";
import { useDbContext } from "../../context/db";
import { replaceRouteFn } from "../../common/navigation";
import { DocumentListScreen } from "./DocumentListScreen";

// TODO - get isserName from verifier instead of getData. this does not support OC documents
const getIssuerName = (document: DocumentObject): string | undefined => {
  const { issuers } = getData(document.document);
  return issuers[0]?.identityProof?.location;
};

export const DocumentListScreenContainer: FunctionComponent<NavigationProps> = ({
  navigation
}) => {
  const { db } = useDbContext();

  // undefined when the db hasn't fulfilled the initial find query
  const [documents, setDocuments] = useState<DocumentObject[]>();
  useEffect(() => {
    const subscription = db!.documents
      .find()
      .sort("created")
      .$.subscribe(setDocuments);
    return () => subscription.unsubscribe();
  }, [db]);

  // opening saved doc uses the verifierType that was saved
  const navigateToDoc = (id: string, verifierType: VerifierTypes): boolean =>
    navigation.navigate("LocalDocumentScreen", { id, verifierType });
  const navigateToScanner = replaceRouteFn(navigation, "QrScannerScreen");

  const documentItems = documents?.map((doc: DocumentObject) => {
    const docClear = getData(doc.document);
    return {
      id: doc.id,
      title: (docClear as any).name, // TODO: figure out typing
      isVerified: doc.isVerified,
      lastVerification: doc.verified,
      issuedBy: getIssuerName(doc),
      verifierType: doc.verifierType
    };
  });
  return (
    <DocumentListScreen
      documentItems={documentItems}
      navigation={navigation}
      navigateToDoc={navigateToDoc}
      navigateToScanner={navigateToScanner}
    />
  );
};

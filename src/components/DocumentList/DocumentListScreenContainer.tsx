import React, { FunctionComponent } from "react";
import { DocumentObject, NavigationProps } from "../../types";
import { getData } from "@govtechsg/open-attestation";
import { DocumentListView } from "./index";

interface DocumentListScreenContainer extends NavigationProps {
  documents: DocumentObject[];
}

const DocumentListScreenContainer: FunctionComponent<DocumentListScreenContainer> = ({
  documents
}: DocumentListScreenContainer) => {
  const navigateToDoc = (docId: string): void => alert(docId);
  const documentItems = documents.map((doc: DocumentObject) => {
    const docClear = getData(doc.document);
    return {
      id: doc.id,
      title: docClear.name,
      isVerified: doc.isVerified,
      lastVerification: doc.verified
    };
  });
  return (
    <DocumentListView documents={documentItems} navigateToDoc={navigateToDoc} />
  );
};

export default DocumentListScreenContainer;

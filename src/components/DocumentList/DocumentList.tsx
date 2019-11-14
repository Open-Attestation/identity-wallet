import React, { ReactElement } from "react";
import { ScrollView } from "react-native";
import { DocumentListItem } from "./DocumentListItem";

export interface DocumentItem {
  id: string;
  title: string;
  isVerified?: boolean;
  lastVerification?: number;
}

export interface DocumentList {
  documents: DocumentItem[];
  navigateToDoc: (documentId: string) => void;
}

export const DocumentList = ({
  documents,
  navigateToDoc
}: DocumentList): ReactElement => {
  const renderedDocumentListItem = documents.map(
    (doc): ReactElement => (
      <DocumentListItem
        key={doc.id}
        title={doc.title}
        isVerified={doc.isVerified}
        lastVerification={doc.lastVerification}
        onPress={(): void => navigateToDoc(doc.id)}
      />
    )
  );
  return (
    <ScrollView style={{ width: "100%", padding: 10, height: "100%" }}>
      {renderedDocumentListItem}
    </ScrollView>
  );
};

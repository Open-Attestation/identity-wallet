import React, { FunctionComponent } from "react";
import { DocumentObject, NavigationProps } from "../../types";
import { getData } from "@govtechsg/open-attestation";
import { LicenceListView } from "./index";

interface LicenceListScreenContainer extends NavigationProps {
  documents: DocumentObject[];
}

const LicenceListScreenContainer: FunctionComponent<LicenceListScreenContainer> = ({
  documents
}: LicenceListScreenContainer) => {
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
    <LicenceListView documents={documentItems} navigateToDoc={navigateToDoc} />
  );
};

export default LicenceListScreenContainer;

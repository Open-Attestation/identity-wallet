import React, { useEffect, useState, FunctionComponent } from "react";
import { NavigationProps, DocumentObject } from "../../types";
import { useDbContext } from "../../context/db";
import LicenseListScreenContainer from "../../components/LicenceList/LicenseListScreenContainer";

const LicenseListScreen: FunctionComponent<NavigationProps> = ({
  navigation
}: NavigationProps) => {
  const { db } = useDbContext();
  const [documents, setDocuments] = useState<DocumentObject[]>([]);

  useEffect(() => {
    db!.documents
      .find()
      .sort({ created: 1 })
      .$.subscribe(setDocuments);
  }, [true]);

  return (
    <LicenseListScreenContainer documents={documents} navigation={navigation} />
  );
};

export default LicenseListScreen;

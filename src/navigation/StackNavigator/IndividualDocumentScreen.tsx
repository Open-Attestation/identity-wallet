import React, { useEffect, useState, FunctionComponent } from "react";
import { NavigationProps, DocumentObject } from "../../types";
import { useDbContext } from "../../context/db";
import ScreenView from "../../components/ScreenView";
import DocumentRenderer from "../../components/DocumentRenderer";
import { LoadingView } from "../../components/Loading";

const IndividualDocumentScreen: FunctionComponent<NavigationProps> = ({
  navigation
}: NavigationProps) => {
  const id = navigation.getParam("id");
  const { db } = useDbContext();
  const [document, setDocument] = useState<DocumentObject>();

  useEffect(() => {
    db!.documents.findOne({ id: { $eq: id } }).$.subscribe(setDocument);
  }, [true]);

  const output = document ? (
    <DocumentRenderer document={document.document} />
  ) : (
    <LoadingView />
  );

  return <ScreenView>{output}</ScreenView>;
};

export default IndividualDocumentScreen;

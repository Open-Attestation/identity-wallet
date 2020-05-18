import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { useDbContext } from "../../context/db";
import {
  DocumentObject,
  LocalDocumentScreenProps,
  DocumentProperties
} from "../../types";
import { DocumentRenderer } from "./DocumentRenderer";
import { DocumentDetailsSheet } from "./DocumentDetailsSheet";
import { LoadingView } from "../Loading";
import { CheckStatus } from "../Validity";
import { VerifierTypes } from "../../types";

export const LocalDocumentRendererContainer: FunctionComponent<LocalDocumentScreenProps> = ({
  navigation,
  route
}) => {
  const id: string = route.params?.id;
  const verifierType: VerifierTypes = route.params?.verifierType;
  const { db } = useDbContext();
  const [document, setDocument] = useState<DocumentObject | null>(null);

  useEffect(() => {
    const subscription = db!.documents
      .findOne({ id: { $eq: id } })
      .$.subscribe(setDocument);
    return () => subscription.unsubscribe();
  }, [db, id]);

  const onVerification = async (checkStatus: CheckStatus): Promise<void> => {
    const updateFunction = (
      oldData: DocumentProperties
    ): DocumentProperties => {
      if (checkStatus === CheckStatus.VALID) {
        oldData.isVerified = true;
        oldData.verified = Date.now();
      } else if (checkStatus === CheckStatus.INVALID) {
        oldData.isVerified = false;
        oldData.verified = Date.now();
      }
      return oldData;
    };
    await document?.atomicUpdate(updateFunction);
  };

  return document ? (
    <View style={{ flex: 1 }}>
      <DocumentRenderer
        document={document.document}
        goBack={() => navigation.goBack()}
      />
      <DocumentDetailsSheet
        document={document}
        onVerification={onVerification}
        savedVerifierType={verifierType}
      />
    </View>
  ) : (
    <LoadingView />
  );
};

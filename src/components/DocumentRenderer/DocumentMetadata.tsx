import React, { FunctionComponent, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { size, color, fontSize } from "../../common/styles";
import { DocumentObject } from "../../types";

const styles = StyleSheet.create({
  metadataItem: {
    marginBottom: size(4)
  },
  metadataTitle: {
    marginBottom: size(1),
    color: color("grey", 15),
    fontSize: fontSize(-2)
  },
  metadataContent: {
    fontSize: fontSize(-1),
    lineHeight: 1.4 * fontSize(-1),
    color: color("grey", 0),
    fontWeight: "bold"
  }
});

export interface DocumentMetadata {
  document: DocumentObject;
}

export const DocumentMetadata: FunctionComponent<DocumentMetadata> = ({
  document
}) => {
  const previousVerifiedDate = useRef(document.verified);
  return (
    <>
      <View style={styles.metadataItem}>
        <Text style={styles.metadataTitle}>Date added</Text>
        <Text style={styles.metadataContent}>
          {new Date(document.created).toLocaleString()}
        </Text>
      </View>
      <View style={styles.metadataItem}>
        <Text style={styles.metadataTitle}>
          Date last verified / Date previously verified
        </Text>
        <Text style={styles.metadataContent}>
          {document.verified
            ? new Date(document.verified).toLocaleString()
            : "-"}
          {previousVerifiedDate.current &&
            ` / ${new Date(previousVerifiedDate.current).toLocaleString()})`}
        </Text>
      </View>
    </>
  );
};

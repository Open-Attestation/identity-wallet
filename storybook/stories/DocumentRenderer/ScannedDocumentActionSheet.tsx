import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { ScannedDocumentActionSheet } from "../../../src/components/DocumentRenderer/ScannedDocumentActionSheet";

const onSave = (): void => alert("Saved");
const onCancel = (): void => alert("Cancelled");
const onDone = (): void => alert("Going back");

storiesOf("DocumentRenderer", module).add(
  "ScannedDocumentActionSheet - Savable",
  () => (
    <View
      style={{
        flex: 1,
        flexDirection: "column-reverse",
        backgroundColor: "lightgrey"
      }}
    >
      <ScannedDocumentActionSheet
        issuedBy="caas.gov.sg"
        isSavable={true}
        onSave={onSave}
        onCancel={onCancel}
      />
    </View>
  )
);

storiesOf("DocumentRenderer", module).add(
  "ScannedDocumentActionSheet - Unsavable",
  () => (
    <View
      style={{
        flex: 1,
        flexDirection: "column-reverse",
        backgroundColor: "lightgrey"
      }}
    >
      <ScannedDocumentActionSheet
        issuedBy="caas.gov.sg"
        isSavable={false}
        onDone={onDone}
      />
    </View>
  )
);

import React from "react";
import { CenterDecorator } from "../decorators";
import { storiesOf } from "@storybook/react-native";

import {
  DocumentListItem,
  DocumentListView
} from "../../../src/components/DocumentList";

const documents = [
  { id: "#1", title: "UAPL", isVerified: true },
  {
    id: "#2",
    title:
      "Bachelor of Biological Sciences with a Second Major in Medicinal Chemistry and Pharmacology",
    isVerified: false
  },
  {
    id: "#3",
    title: "Bachelor of Computer Science",
    isVerified: false,
    lastVerification: Date.now()
  }
];

storiesOf("DocumentList", module).add("DocumentListView", () => (
  <DocumentListView documents={documents} navigateToDoc={alert} />
));

storiesOf("DocumentList", module)
  .addDecorator(CenterDecorator)
  .add("DocumentListItem", () => (
    <DocumentListItem
      title="UAPL"
      isVerified={true}
      onPress={(): void => alert("Oink!")}
    />
  ));

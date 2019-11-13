import React from "react";
import { CenterDecorator } from "../decorators";
import { storiesOf } from "@storybook/react-native";

import {
  LicenceListItem,
  LicenceListView
} from "../../../src/components/LicenceList";

const documents = [
  { id: "#1", title: "UAPL", isVerified: true },
  {
    id: "#2",
    title:
      "Bachelor of Biological Sciences with a Second Major in Medicinal Chemistry and Pharmacology",
    isVerified: false
  }
];

storiesOf("LicenceList", module).add("LicenceListView", () => (
  <LicenceListView documents={documents} navigateToDoc={alert} />
));

storiesOf("LicenceList", module)
  .addDecorator(CenterDecorator)
  .add("LicenceListItem", () => (
    <LicenceListItem
      title="UAPL"
      isVerified={true}
      onPress={(): void => alert("Oink!")}
    />
  ));

import React from "react";
import { storiesOf } from "@storybook/react-native";

import { DocumentRenderer } from "../../../src/components/DocumentRenderer/DocumentRenderer";
import demoOc from "../../../fixtures/demo-oc.json";
import demoCaas from "../../../fixtures/demo-caas.json";
import demoEbl from "../../../fixtures/demo-ebl.json";
import { SafeAreaView } from "react-native";

const mockBack = (): void => {
  alert("Back!");
};

storiesOf("DocumentRenderer", module).add("Demo - OpenCerts", () => (
  <SafeAreaView>
    <DocumentRenderer document={demoOc} goBack={mockBack} />
  </SafeAreaView>
));

storiesOf("DocumentRenderer", module).add("Demo - UALP", () => (
  <SafeAreaView>
    <DocumentRenderer document={demoCaas} goBack={mockBack} />
  </SafeAreaView>
));

storiesOf("DocumentRenderer", module).add("Demo - eBL", () => (
  <SafeAreaView>
    <DocumentRenderer document={demoEbl} goBack={mockBack} />
  </SafeAreaView>
));

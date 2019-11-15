import React from "react";
import { storiesOf } from "@storybook/react-native";

import { DocumentRenderer } from "../../../src/components/DocumentRenderer/DocumentRenderer";
import demoOc from "../../../fixtures/demo-oc.json"
import demoCaas from "../../../fixtures/demo-caas.json";
import demoEbl from "../../../fixtures/demo-ebl.json";

const mockBack = () => {
  alert("Back!");
};

storiesOf("DocumentRenderer", module).add("OpenCerts", () => (
  <DocumentRenderer document={demoOc} goBack={mockBack} />
));

storiesOf("DocumentRenderer", module).add("UALP", () => (
  <DocumentRenderer document={demoCaas} goBack={mockBack} />
));

storiesOf("DocumentRenderer", module).add("eBL", () => (
  <DocumentRenderer document={demoEbl} goBack={mockBack} />
));

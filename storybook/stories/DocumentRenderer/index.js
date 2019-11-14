import React from "react";
import { storiesOf } from "@storybook/react-native";

import { DocumentRenderer } from "../../../src/components/DocumentRenderer/DocumentRenderer";
import demoOc from "./demo-oc.json";
import demoCaas from "./demo-caas.json";

storiesOf("DocumentRenderer", module).add("Demo OpenCerts", () => (
  <DocumentRenderer document={demoOc} />
));

storiesOf("DocumentRenderer", module).add("Demo CAAS", () => (
  <DocumentRenderer document={demoCaas} />
));

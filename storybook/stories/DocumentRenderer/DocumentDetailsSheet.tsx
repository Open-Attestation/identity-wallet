import React from "react";
import { storiesOf } from "@storybook/react-native";
import { CenterDecorator } from "../decorators";
import { DocumentDetailsSheet } from "../../../src/components/DocumentRenderer/DocumentDetailsSheet";
import demoCaas from "../../../fixtures/demo-caas.json";

const mockOnVerification = (): void => {};

storiesOf("DocumentRenderer", module)
  .addDecorator(CenterDecorator)
  .add("DocumentDetailsSheet", () => (
    <DocumentDetailsSheet
      document={{
        id: "testing",
        created: 12345,
        document: demoCaas
      }}
      onVerification={mockOnVerification}
    ></DocumentDetailsSheet>
  ));

import { RxJsonSchema, RxCollectionCreator, RxDatabaseCreator } from "rxdb";
import { DocumentProperties } from "../types";

export const dbName = "idwallet4";
export const dbPassword = "supersecretpassword";

export const db: RxDatabaseCreator = {
  name: dbName,
  adapter: "react-native-sqlite",
  password: dbPassword,
  multiInstance: false,
  pouchSettings: { skip_setup: true } // eslint-disable-line @typescript-eslint/camelcase
};

export const documentSchema: RxJsonSchema<DocumentProperties> = {
  version: 1,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true
    },
    created: {
      type: "number",
      index: true
    },
    verified: {
      type: "number",
      index: true
    },
    isVerified: {
      type: "boolean"
    },
    document: {
      type: "object"
    },
    qrCode: {
      type: "object",
      properties: {
        url: {
          type: "string"
        },
        expiry: {
          type: "number"
        }
      }
    },
    verifierType: {
      type: "string"
    },
    issuerName: {
      type: "string"
    }
  }
};

export const documentsCollection: RxCollectionCreator = {
  name: "documents",
  schema: documentSchema,
  migrationStrategies: {
    1: (oldDoc: DocumentProperties) => oldDoc
  }
};

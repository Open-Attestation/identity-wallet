import * as yup from "yup";

export enum DocumentPermittedAction {
  VIEW = "VIEW",
  STORE = "STORE"
}

export interface DocumentAction {
  uri: string;
  key?: string;
  expiry?: number;
  permittedActions?: DocumentPermittedAction[];
  redirect?: string;
}

const documentPermittedActionRegex = RegExp(
  Object.keys(DocumentPermittedAction).join("|")
);

const documentActionSchema = yup
  .object({
    uri: yup
      .string()
      .required()
      .url(),
    key: yup.string(),
    expiry: yup.number(),
    permittedActions: yup
      .array()
      .of(yup.string().matches(documentPermittedActionRegex)),
    redirect: yup.string().url()
  })
  .noUnknown(true);

export const validateDocumentAction = (payload: any): DocumentAction =>
  documentActionSchema.validateSync(payload, {
    strict: true
  }) as DocumentAction;

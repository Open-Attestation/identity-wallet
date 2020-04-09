import { decryptString } from "@govtechsg/oa-encryption";
import { OAWrappedDocument } from "../../types";

interface EncryptedDocumentAction {
  uri: string;
  key: string;
}

export const fetchCleartextDocument = async (payload: {
  uri: string;
}): Promise<OAWrappedDocument> => fetch(payload.uri).then(res => res.json());

interface EncryptedResponse {
  tag: string;
  cipherText: string;
  iv: string;
  type: string;
}

type Response =
  | (EncryptedResponse & { document: null })
  | { document: EncryptedResponse };

export const fetchEncryptedDocument = async ({
  uri,
  key
}: EncryptedDocumentAction): Promise<OAWrappedDocument> => {
  const response: Response = await fetch(uri).then(res => res.json());
  const document = response.document || response;
  const { tag, cipherText, iv, type } = document;

  const cipher = {
    tag,
    cipherText,
    iv,
    key,
    type
  };
  return JSON.parse(decryptString(cipher)) as OAWrappedDocument;
};

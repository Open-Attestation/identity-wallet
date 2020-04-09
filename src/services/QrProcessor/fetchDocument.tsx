import { decryptString } from "@govtechsg/oa-encryption";
import { OAWrappedDocument } from "../../types";

interface EncryptedDocumentAction {
  uri: string;
  key: string;
}

export const fetchCleartextDocument = async (payload: {
  uri: string;
}): Promise<OAWrappedDocument> => fetch(payload.uri).then(res => res.json());

const extractDataFromResponse = (
  res: any
): { tag: any; cipherText: any; iv: any; type: any } => {
  if (res.document) {
    const {
      document: { tag, cipherText, iv, type }
    } = res;
    return { tag, cipherText, iv, type };
  } else {
    const { tag, cipherText, iv, type } = res;
    return { tag, cipherText, iv, type };
  }
};

export const fetchEncryptedDocument = async ({
  uri,
  key
}: EncryptedDocumentAction): Promise<OAWrappedDocument> => {
  const response = await fetch(uri).then(res => res.json());
  const { tag, cipherText, iv, type } = extractDataFromResponse(response);

  const cipher = {
    tag,
    cipherText,
    iv,
    key,
    type
  };
  return JSON.parse(decryptString(cipher)) as OAWrappedDocument;
};

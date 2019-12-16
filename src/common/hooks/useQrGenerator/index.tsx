import { useState } from "react";
import { uploadDocument } from "../../../services/DocumentSharing";
import { Document } from "@govtechsg/open-attestation";

export const useQrGenerator = (): [
  { qrCode?: string; qrCodeLoading?: boolean },
  (document: Document) => () => Promise<void>
] => {
  const [qrCode, setQrCode] = useState("");
  const [qrCodeLoading, setQrCodeLoading] = useState(false);

  const generateQr = (document: Document) => async (): Promise<void> => {
    try {
      setQrCodeLoading(true);
      const code = await uploadDocument(document);
      setQrCode(code);
    } catch (e) {
      alert(e.message);
    }
    setQrCodeLoading(false);
  };

  return [{ qrCode, qrCodeLoading }, generateQr];
};

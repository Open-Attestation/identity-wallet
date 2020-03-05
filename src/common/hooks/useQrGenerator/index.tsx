import { useState, useRef, useEffect, useCallback } from "react";
import { uploadDocument } from "../../../services/DocumentSharing";
import debounce from "lodash/debounce";
import { useConfigContext } from "../../../context/config";
import { OAWrappedDocument } from "../../../types";

const GENERATE_QR_DEBOUNCE_MS = 500;

type QrCode = { url: string; expiry?: number };
export interface QrGenerator {
  qrCode: QrCode;
  qrCodeLoading: boolean;
  generateQr: (document: OAWrappedDocument) => Promise<void>;
}

export const useQrGenerator = (
  initialQrCode: QrCode = { url: "" }
): QrGenerator => {
  const {
    config: { network }
  } = useConfigContext();
  const isMounted = useRef(false);
  const [qrCode, setQrCode] = useState<QrCode>(initialQrCode);
  const [qrCodeLoading, setQrCodeLoading] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const generateQr = useCallback(
    debounce(async (document: OAWrappedDocument) => {
      try {
        setQrCodeLoading(true);
        const code = await uploadDocument(document, network);
        if (!isMounted.current) {
          return;
        }
        setQrCode(code);
      } catch (e) {
        alert(e.message);
      }
      setQrCodeLoading(false);
    }, GENERATE_QR_DEBOUNCE_MS),
    []
  );

  return { qrCode, qrCodeLoading, generateQr };
};

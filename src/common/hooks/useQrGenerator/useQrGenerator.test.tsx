import { renderHook, act } from "@testing-library/react-hooks";
import sampleDoc from "../../../../fixtures/demo-oc.json";
import { useQrGenerator } from "./index";
import { uploadDocument } from "../../../services/DocumentSharing";

jest.mock("../../../services/DocumentSharing");

const mockUploadDocument = uploadDocument as jest.Mock;

describe("useQrGenerator", () => {
  it("should have empty qr code that is not loading by default", () => {
    expect.assertions(2);
    const { result } = renderHook(() => useQrGenerator());
    expect(result.current[0].qrCode).toBe("");
    expect(result.current[0].qrCodeLoading).toBe(false);
  });

  it("should upload document and updates qr code", async () => {
    expect.assertions(3);
    const { result } = renderHook(() => useQrGenerator());
    const generateQr = result.current[1];
    mockUploadDocument.mockResolvedValue("QR_CODE");
    let deferredGenerateQr: Promise<void>;
    act(() => {
      deferredGenerateQr = generateQr(sampleDoc)();
    });
    expect(result.current[0].qrCodeLoading).toBe(true);
    await act(async () => {
      await deferredGenerateQr;
    });
    expect(result.current[0].qrCode).toBe("QR_CODE");
    expect(result.current[0].qrCodeLoading).toBe(false);
  });

  it("should alert errors", async () => {
    expect.assertions(1);
    const { result } = renderHook(() => useQrGenerator());
    const generateQr = result.current[1];
    mockUploadDocument.mockRejectedValue(new Error("UPLOAD_ERROR"));
    await act(async () => {
      await generateQr(sampleDoc)();
    });
    const globalAny: any = global;
    expect(globalAny.alert.mock.calls[0][0]).toMatch("UPLOAD_ERROR");
  });
});

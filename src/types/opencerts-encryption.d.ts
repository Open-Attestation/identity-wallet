declare module "@govtechsg/opencerts-encryption" {
  export interface Cipher {
    tag: string;
    cipherText: string;
    iv: string;
    key: string;
    type: string;
  }
  export function decryptString(cipher: Cipher): string;
}

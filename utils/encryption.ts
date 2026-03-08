import { AES } from "crypto-js";
import Utf8 from 'crypto-js/enc-utf8';

// Sign a fixed message to derive a strong encryption key
export async function deriveEncryptionKey(
  signMessage: (msg: Uint8Array) => Promise<Uint8Array>,
): Promise<string> {
  const message = new TextEncoder().encode('social_vault_v1_encryption_key');
  const signature = await signMessage(message);
  return Buffer.from(signature).toString('hex').slice(0, 64);
}

export function encryptToken(rawToken: string, key: string): string {
  return AES.encrypt(rawToken, key).toString();
}

export function decryptToken(encryptedToken: string, key: string): string {
  const bytes = AES.decrypt(encryptedToken, key);
  return bytes.toString(Utf8);
}
import { ENCRYPTION_SECRET } from "../../config/config.service.js";
import CryptoJS from "crypto-js";

// import bcrypt from 'bcryptjs'

export function encrypt({
  value,
  key = ENCRYPTION_SECRET,
}: {
  value: string;
  key?: string;
}) {
  const cipherText = CryptoJS.AES.encrypt(value, key).toString();
  return cipherText;
}

export function decrypt({
  encryptedText,
  key = ENCRYPTION_SECRET,
}: {
  encryptedText: string;
  key?: string;
}) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
}

import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../config/config.service.js";

export async function hashOperation({
  plainText,
  salt = SALT_ROUNDS,
}: {
  plainText: string;
  salt?: number;
}) {
  return await bcrypt.hash(plainText, salt);
}

export async function CompareOperation({
  plainText,
  hashText,
}: {
  plainText: string;
  hashText: string;
}) {
  return await bcrypt.compare(plainText, hashText);
}

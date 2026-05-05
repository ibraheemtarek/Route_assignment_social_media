import type z from "zod";
import type { signupSchema } from "./auth.validation.js";

export interface LoginDTO {
  email: string;
  password: string;
}

export type SignupDTO = z.infer<typeof signupSchema.body>;
// export interface SignupDTO extends LoginDTO {
//   username: string;
// }

import z from "zod";
import { GenderEnum } from "../common/enums/user.enums.js";
import { commonValidationFields } from "../Middlewares/validation.middleware.js";

export const signupSchema = {
  body: z
    .strictObject({
      username: commonValidationFields.username,
      password: commonValidationFields.password,
      confirmPassword: z.string(),
      email: commonValidationFields.email,
      age: commonValidationFields.age.optional(),
      gender: commonValidationFields.gender.optional(),
      phone: commonValidationFields.phone.optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: "passwords do not match",
    }),
};

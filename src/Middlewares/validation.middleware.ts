import type { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../common/execptions/domain.execptions.js";
import { z, type ZodType } from "zod";
import { GenderEnum } from "../common/enums/user.enums.js";

type keyofRequest = keyof Request;
export function validation(
  validationSchema: Partial<Record<keyofRequest, ZodType>>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationErrors: { path: PropertyKey[]; message: string }[] = [];

    for (const key of Object.keys(validationSchema) as keyofRequest[]) {
      if (validationSchema[key] == undefined) {
        continue;
      }
      const validationResult = validationSchema[key].safeParse(req[key]);
      if (!validationResult.success) {
        // validationErrors.push({
        //   path: key,
        //   message: JSON.parse(validationResult.error.message),
        // });
        validationErrors.push(
          ...validationResult.error.issues.map((i) => {
            return {
              path: i.path,
              message: i.message,
            };
          }),
        );
      }
    }
    if (validationErrors.length > 0) {
      throw new BadRequestError("validation error", {
        error: validationErrors,
      });
    }
    next();
  };
}

export const commonValidationFields = {
  username: z.string().min(3).max(10),
  password: z
    .string()
    .regex(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,16}$",
      ),
    ),
  email: z.email(),
  age: z.number().min(18).max(100).positive(),
  gender: z.enum(GenderEnum),
  phone: z.string().min(11).max(11),
};

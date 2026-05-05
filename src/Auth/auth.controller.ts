import express from "express";
import authService from "./auth.service.js";
import succussResponse from "../common/response/succuss.response.js";
import { BadRequestError } from "../common/execptions/domain.execptions.js";
import { signupSchema } from "./auth.validation.js";
import { validation } from "../Middlewares/validation.middleware.js";

const authController = express.Router();

authController.get("/", (req, res) => {
  succussResponse({ res, msg: "Auth page" });
});

authController.post("/signup", validation(signupSchema), async (req, res) => {
  const result = await authService.signup(req.body);
  return succussResponse({ res, data: result });
});

authController.post("/login", (req, res) => {
  const result = authService.login(req.body);
  succussResponse({ res, data: result });
});

export default authController;

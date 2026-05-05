import type { Response } from "express";

function succussResponse<T>({
  res,
  statusCode = 200,
  msg = "Done",
  data,
}: {
  res: Response;
  statusCode?: number;
  msg?: string;
  data?: T;
}) {
  return res.status(statusCode).json({ msg, data });
}

export default succussResponse;

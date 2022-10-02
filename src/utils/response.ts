import { Response } from "express";

export function sendError(
  res: Response,
  error?: string | Error,
  code: number = 400
) {
  if (error instanceof Error) {
    return res.status(code).json({ error: error.message });
  } else if (typeof error === "string") {
    return res.status(code).json({ error: "unknown error occured" });
  }
  return res.status(code).json({ error: "unknown error occured" });
}

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { TOKEN_KEY } from "../../config/keys.js";

export default function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (!TOKEN_KEY) {
    return res.status(500).json({ message: "TOKEN_KEY required" });
  }

  jwt.verify(token, TOKEN_KEY, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
    return;
  });
  return;
}


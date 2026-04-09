import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { SALT } from "../../config/keys.js";
import { createSecretToken } from "../../middlewares/auth/auth.middleware.js";
import { IUser } from "../user/user.interface.js";
import * as AuthUsecase from "./auth.usecase.js";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const user = new IUser(req.body);

    const saltRounds = SALT ? Number(SALT) : 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    user.password = hashedPassword;

    const data = await AuthUsecase.createUser(user);

    return res.status(200).json({
      statusCode: 200,
      data,
      message: "User registered successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { email, phone, password } = req.body as {
    email?: string;
    phone?: string;
    password?: string;
  };

  try {
    if (!((email || phone) && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const user = await AuthUsecase.findUserWithPassword({ email, phone });

    const userPassword = (user as any)?.password as string | undefined;
    if (
      !(user && userPassword && (await bcrypt.compare(password, userPassword)))
    ) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = createSecretToken(user as any);

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "strict" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: "User logged in successfully.", data: token });
  } catch (error) {
    return next(error);
  }
}

export async function logout(
  _req: Request,
  res: Response
): Promise<Response | void> {
  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    path: "/",
  });

  return res
    .status(200)
    .json({ message: "User logged out successfully.", data: null });
}


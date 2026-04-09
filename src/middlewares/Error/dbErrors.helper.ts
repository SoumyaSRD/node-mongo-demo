import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      statusCode: 400,
      status: "fail",
      message: "Validation Error",
      errors: err.errors,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      statusCode: 400,
      status: "fail",
      message: "Bad request",
      errMsg: "Invalid ID format",
    });
  }

  if (err?.code && err.code === 11000) {
    return res.status(409).json({
      statusCode: 409,
      status: "fail",
      errMsg: "Duplicate key error",
      keyValue: err.keyValue,
      message: `${Object.keys(err.keyValue)[0]} already exist`,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    status: "error",
    message: "Internal Server Error",
  });
}


// errorHandler.js
const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    // Handle Mongoose validation error
    return res.status(400).json({
      statusCode: 400,
      status: "fail",
      message: "Validation Error",
      errors: err.errors,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    // Handle Mongoose cast error (invalid ObjectId)
    return res.status(400).json({
      statusCode: 400,
      status: "fail",
      message: "Bad request",
      errMsg: "Invalid ID format",
    });
  }

  if (err?.code && err.code === 11000) {
    // Handle Mongoose duplicate key error
    return res.status(409).json({
      statusCode: 409,
      status: "fail",
      errMsg: "Duplicate key error",
      keyValue: err.keyValue,
      message: `${Object.keys(err.keyValue)[0]} already exist`,
    });
  }

  // Handle other errors
  return res.status(500).json({
    statusCode: 500,
    status: "error",
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;

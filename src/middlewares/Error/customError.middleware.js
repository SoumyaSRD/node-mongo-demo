/* class CustomError extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  } */

const CustomError = (error) => {
  return {
    statusCode: error.statusCode || 500,

    message: error.message,
  };
};

module.exports = CustomError;

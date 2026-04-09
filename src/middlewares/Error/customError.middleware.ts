export default function CustomError(error: any) {
  return {
    statusCode: error.statusCode || 500,
    message: error.message,
  };
}


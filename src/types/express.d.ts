import "express";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface Request {
      user?: any;
    }
  }
}

export {};

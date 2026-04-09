import mongoose from "mongoose";

import { MONGO_URI } from "./keys.js";

export async function startDb(): Promise<void> {
  if (!MONGO_URI) throw new Error("MONGO_URI required");
  try {
    await mongoose.connect(MONGO_URI);
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  } catch {
    throw new Error("Database connection error");
  }
}


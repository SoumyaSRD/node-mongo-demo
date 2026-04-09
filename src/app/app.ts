import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { startDb } from "../config/db.config.js";
import setupSwaggerDocs from "../middlewares/swagger/swagger.middleware.js";
import routes from "../routes/index.js";
import errorHandler from "../middlewares/Error/dbErrors.helper.js";

const app = express();

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["*"];

const isWildcard = corsOrigins.length === 1 && corsOrigins[0] === "*";

const corsOptions: cors.CorsOptions = {
  origin: isWildcard
    ? "*"
    : (origin, callback) => {
        if (!origin) return callback(null, true);
        if (corsOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
      },
  credentials: !isWildcard,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "500mb" }));
app.use(cookieParser());

setupSwaggerDocs(app);

// connect DB (fire and forget)
startDb().catch((err: Error) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

app.use("/", routes);
app.use(errorHandler);

export default app;


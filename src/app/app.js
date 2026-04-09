const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

const start = require("../config/db.config");

const setupSwaggerDocs = require("../middlewares/swagger/swagger.middleware");

const cors = require(`cors`);

const routes = require(`../routes`);

const errorHandler = require("../middlewares/Error/dbErrors.hepler");

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["*"];

const corsOptions = {
  origin:
    corsOrigins.length === 1 && corsOrigins[0] === "*"
      ? "*"
      : (origin, callback) => {
          // Allow non-browser clients (no origin) + allowlisted origins
          if (!origin) return callback(null, true);
          if (corsOrigins.includes(origin)) return callback(null, true);
          return callback(new Error("Not allowed by CORS"));
        },
  credentials: !(corsOrigins.length === 1 && corsOrigins[0] === "*"),
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false, limit: "500mb" }));

app.use(cookieParser());

setupSwaggerDocs(app);

start();

app.use("/", routes);

app.use(errorHandler);

module.exports = app;

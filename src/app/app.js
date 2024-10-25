const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

const start = require("../config/db.config");

const setupSwaggerDocs = require("../middlewares/swagger/swagger.middleware");

const cors = require(`cors`);

const DefaultRouter = require(`../routes/default.routes`);

const errorHandler = require("./helpers/dbErrors.hepler");

const corsOptions = {
  origin: "*", // Allow only this origin,
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false, limit: "500mb" }));

app.use(cookieParser());

setupSwaggerDocs(app);

start();

app.use("/", DefaultRouter);

app.use(errorHandler);

module.exports = app;

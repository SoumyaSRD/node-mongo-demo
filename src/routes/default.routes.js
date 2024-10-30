const express = require("express");

const userRoutes = require(`./user.routes`);

const authRoutes = require(`./auth.routes`);

const sseRoutes = require(`./sse.routes`);

const departmentRoutes = require("./department.routes");

const DefaultRouter = express();

DefaultRouter.use("/auth", authRoutes);

DefaultRouter.use("/user", userRoutes);

DefaultRouter.use("/events", sseRoutes);

DefaultRouter.use("/department", departmentRoutes);

DefaultRouter.use("/", (req, res, next) => {
  res.send("Welcome to Hell");
});

module.exports = DefaultRouter;

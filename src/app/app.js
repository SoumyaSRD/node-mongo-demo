const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

const start = require("../config/db.config");

const setupSwaggerDocs = require("../middlewares/swagger/swagger.middleware");

const userRoutes = require(`../routes/user.routes`);
const authRoutes = require(`../routes/auth.routes`);

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use(cookieParser());

setupSwaggerDocs(app);

start();

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;

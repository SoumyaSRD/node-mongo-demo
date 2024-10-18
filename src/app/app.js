const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

const start = require("../config/db.config");

const setupSwaggerDocs = require("../middlewares/swagger/swagger.middleware");

const userRoutes = require(`../routes/user.routes`);

const authRoutes = require(`../routes/auth.routes`);

const sseRoutes = require(`../routes/sse.routes`);

const cors = require(`cors`);

const corsOptions = {
  origin: "*", // Allow only this origin,
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use(cookieParser());

setupSwaggerDocs(app);

start();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.get("/events", sseRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;

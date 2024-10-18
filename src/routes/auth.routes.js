const express = require("express");

const authRoutes = express.Router();

const AuthController = require("../app/controllers/auth.controller");

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.createUser);
authRoutes.get("/logout", AuthController.logout);

module.exports = authRoutes;

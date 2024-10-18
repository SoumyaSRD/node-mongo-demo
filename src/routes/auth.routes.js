const express = require("express");

const authRoutes = express.Router();

const AuthController = require("../app/controllers/auth.controller");

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.createUser);

module.exports = authRoutes;

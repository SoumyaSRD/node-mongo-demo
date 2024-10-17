const express = require("express");

const authRoutes = express.Router();

const AuthController = require("../app/controllers/auth.controller");

authRoutes.post("/login", AuthController.login);

module.exports = authRoutes;

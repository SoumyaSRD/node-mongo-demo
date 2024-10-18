const express = require("express");

const sseRoutes = express.Router();

const SseController = require("../app/controllers/sse.controller");

sseRoutes.get("/login", SseController.excel);

module.exports = sseRoutes;

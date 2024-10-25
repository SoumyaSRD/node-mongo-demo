const express = require("express");

const sseRoutes = express.Router();

const SseController = require("../app/controllers/sse.controller");

const upload = require("../middlewares/file/fileUpload");

// sseRoutes.post("", upload.single("file"), SseController.sseEvents);
sseRoutes.post("", SseController.sseEvents);

module.exports = sseRoutes;

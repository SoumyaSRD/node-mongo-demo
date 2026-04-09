const express = require("express");

const SseController = require("./sse.controller");

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Events
 *     description: Server-sent events
 */

/**
 * @openapi
 * /events:
 *   post:
 *     tags: [Events]
 *     summary: Start SSE stream
 *     produces:
 *       - text/event-stream
 *     responses:
 *       200: { description: OK }
 */
router.post("", SseController.sseEvents);

module.exports = router;

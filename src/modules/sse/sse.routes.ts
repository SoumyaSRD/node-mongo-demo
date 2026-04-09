import { Router } from "express";

import * as SseController from "./sse.controller.js";

const router = Router();

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

export default router;


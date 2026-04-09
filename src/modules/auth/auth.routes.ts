import { Router } from "express";

import * as AuthController from "./auth.controller.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data: { type: string, description: JWT Token }
 */
router.post("/login", AuthController.login);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post("/register", AuthController.createUser);

/**
 * @openapi
 * /auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Logout
 *     responses:
 *       200: { description: OK }
 */
router.get("/logout", AuthController.logout);

export default router;


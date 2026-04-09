const express = require("express");

const AuthController = require("./auth.controller");

const router = express.Router();

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
 *             type: object
 *             properties:
 *               email: { type: string }
 *               phone: { type: string }
 *               password: { type: string }
 *             required: [password]
 *     responses:
 *       200: { description: OK }
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
 *             type: object
 *     responses:
 *       200: { description: OK }
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

module.exports = router;

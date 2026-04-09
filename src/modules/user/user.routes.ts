import { Router } from "express";

import * as UserController from "./user.controller.js";
import upload from "../../middlewares/file/fileUpload.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: User
 *     description: User management
 */

/**
 * @openapi
 * /user:
 *   get:
 *     tags: [User]
 *     summary: List users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 message: { type: string }
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.get("", UserController.findAllUser);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data: { $ref: '#/components/schemas/User' }
 *                 message: { type: string }
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.get("/:id", UserController.findUserById);

/**
 * @openapi
 * /user:
 *   put:
 *     tags: [User]
 *     summary: Update user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("", UserController.updateUser);

/**
 * @openapi
 * /user/upload:
 *   post:
 *     tags: [User]
 *     summary: Upload a file (SSE response)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file: { type: string, format: binary }
 *     responses:
 *       200: { description: OK }
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.post("/upload", upload.single("file"), UserController.upload);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.delete("/:id", UserController.deleteUser);

/**
 * @openapi
 * /user/filter:
 *   post:
 *     tags: [User]
 *     summary: Filter users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200: { description: OK }
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.post("/filter", UserController.filterUser);

export default router;


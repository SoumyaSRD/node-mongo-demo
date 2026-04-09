import { Router } from "express";

import * as DepartmentController from "./department.controller.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Department
 *     description: Department management
 */

/**
 * @openapi
 * /department:
 *   get:
 *     tags: [Department]
 *     summary: List departments
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
 *                     $ref: '#/components/schemas/Department'
 *                 message: { type: string }
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.get("", DepartmentController.findDepartments);

/**
 * @openapi
 * /department/{id}:
 *   get:
 *     tags: [Department]
 *     summary: Get department by id
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
 *                 data: { $ref: '#/components/schemas/Department' }
 *                 message: { type: string }
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.get("/:id", DepartmentController.findDepartmentById);

/**
 * @openapi
 * /department:
 *   post:
 *     tags: [Department]
 *     summary: Create department
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepartmentInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.post("", DepartmentController.saveDepartment);

/**
 * @openapi
 * /department:
 *   put:
 *     tags: [Department]
 *     summary: Update department
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepartmentInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401: { description: Authentication required }
 *       403: { description: Invalid token }
 */
router.put("", DepartmentController.updateDepartment);

/**
 * @openapi
 * /department/{id}:
 *   delete:
 *     tags: [Department]
 *     summary: Delete department
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
router.delete("/:id", DepartmentController.deleteDepartment);

export default router;


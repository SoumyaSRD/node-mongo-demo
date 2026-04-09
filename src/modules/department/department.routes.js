const express = require("express");

const DepartmentController = require("./department.controller");

const router = express.Router();

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
 *       200: { description: OK }
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
 *       200: { description: OK }
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
 *           schema: { type: object }
 *     responses:
 *       200: { description: OK }
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
 *           schema: { type: object }
 *     responses:
 *       200: { description: OK }
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

module.exports = router;

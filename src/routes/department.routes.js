const express = require("express");

const deptController = require("../app/controllers/department.controller");

const departmentRoutes = express.Router();

departmentRoutes.get("", deptController.findDepartments);
departmentRoutes.get("/:id", deptController.findDepartmentById);
departmentRoutes.post("", deptController.saveDepartment);
departmentRoutes.put("", deptController.updateDepartment);
departmentRoutes.delete("/:id", deptController.deleteDepartment);

module.exports = departmentRoutes;

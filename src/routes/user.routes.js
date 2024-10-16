const express = require("express");

const UserController = require("../app/controllers/user.controller");

const router = express.Router();
router.get("", UserController.findAllUser);
router.get(":id", UserController.findUserById);
router.post("", UserController.createUser);
module.exports = router;

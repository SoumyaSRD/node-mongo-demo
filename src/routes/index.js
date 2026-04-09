const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/user/user.routes");
const departmentRoutes = require("../modules/department/department.routes");
const sseRoutes = require("../modules/sse/sse.routes");

const authenticateJWT = require("../middlewares/auth/jwt.middleware");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", authenticateJWT, userRoutes);
router.use("/events", sseRoutes);
router.use("/department", departmentRoutes);

router.get("/", (req, res) => {
  res.send("Welcome");
});

module.exports = router;

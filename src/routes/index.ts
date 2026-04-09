import { Router } from "express";
import authenticateJWT from "../middlewares/auth/jwt.middleware.js";
import authRoutes from "../modules/auth/auth.routes.js";
import departmentRoutes from "../modules/department/department.routes.js";
import sseRoutes from "../modules/sse/sse.routes.js";
import userRoutes from "../modules/user/user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", authenticateJWT, userRoutes);
router.use("/events", sseRoutes);
router.use("/department", departmentRoutes);

router.get("/", (_req, res) => {
  res.send("Welcome");
});

export default router;


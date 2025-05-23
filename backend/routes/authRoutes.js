import express from "express";
import {
  getProfile,
  login,
  logout,
  refreshToken,
  signup,
} from "../controllers/authController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectedRoute, getProfile);

export default router;

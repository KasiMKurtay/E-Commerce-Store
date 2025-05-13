import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { couponValidate, getCoupon } from "../controllers/couponController.js";

const router = express.Router();

router.get("/", protectedRoute, getCoupon);
router.post("/validate", protectedRoute, couponValidate);

export default router;

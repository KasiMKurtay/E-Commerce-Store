import express from "express";
import {
  checkSuccess,
  createCheckoutSession,
} from "../controllers/paymentController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", protectedRoute, createCheckoutSession);
router.post("/checkout-success", protectedRoute, checkSuccess);

export default router;

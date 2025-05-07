import express from "express";
import {
  getAllProducts,
  featuredProducts,
  createProduct,
  deleteProduct,
  getRecProducts,
  getCategoryProducts,
  toggleProduct,
} from "../controllers/productController.js";
import { adminRoute, protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectedRoute, adminRoute, getAllProducts);
router.get("/featured", featuredProducts);
router.get("/category/:category", getCategoryProducts);
router.get("/recommendations", getRecProducts);
router.post("/", protectedRoute, adminRoute, createProduct);
router.patch("/:id", protectedRoute, adminRoute, toggleProduct);
router.delete("/:id", protectedRoute, adminRoute, deleteProduct);

export default router;

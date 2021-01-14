import express from "express";
const router = express.Router();
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { authUser } from "../controllers/userController.js";

router.post("/login", authUser);
router.route("/:id").get(getProductById);

export default router;

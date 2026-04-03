import express from "express";
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "../controllers/cart.controller.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const cartRoutes = express.Router();

cartRoutes.post("/add", requireSignIn, addToCart);
cartRoutes.get("/", requireSignIn, getCart);
cartRoutes.delete("/:productId", requireSignIn, removeFromCart);
cartRoutes.put("/update", requireSignIn, updateCartQuantity);

export default cartRoutes;
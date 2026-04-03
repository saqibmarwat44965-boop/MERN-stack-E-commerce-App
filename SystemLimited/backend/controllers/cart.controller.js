import Cart from "../models/cartModel.js";
import { error, success } from "../helpers/error.js";

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from requireSignIn
    const { productId } = req.body;

    if (!productId) return error(res, "Product ID is required");

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }
    }

    await cart.save();

    return success(res, "Product added to cart", { cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    return error(res, "Server error");
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    
    console.log("CART DATA:", JSON.stringify(cart, null, 2));
    return res.status(200).json({
      success : true,
      cart,
    });
  } catch (err) {
    console.error("Get cart error:", err);
    return error(res, "Server error");
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return error(res, "Cart not found");

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    return success(res, "Item removed from cart", { cart });
  } catch (err) {
    console.error("Remove from cart error:", err);
    return error(res, "Server error");
  }
};


export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, action } = req.body; // action: "inc" | "dec"

    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) return res.status(404).json({ error: "Item not found" });

    if (action === "inc") {
      item.quantity += 1;
    } else if (action === "dec") {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
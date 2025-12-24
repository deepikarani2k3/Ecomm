const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ADD TO CART
router.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  if (product.stock < quantity)
    return res.status(400).json({ message: "Insufficient stock" });

  const cartItem = await Cart.create({
    userId: req.user.id,
    productId,
    quantity
  });

  res.status(201).json(cartItem);
});

// UPDATE CART
router.put("/:id", protect, async (req, res) => {
  const { quantity } = req.body;

  const cartItem = await Cart.findById(req.params.id);
  if (!cartItem)
    return res.status(404).json({ message: "Cart item not found" });

  cartItem.quantity = quantity;
  await cartItem.save();

  res.json(cartItem);
});

// DELETE CART ITEM
router.delete("/:id", protect, async (req, res) => {
  const cartItem = await Cart.findById(req.params.id);
  if (!cartItem)
    return res.status(404).json({ message: "Cart item not found" });

  await cartItem.deleteOne();
  res.json({ message: "Item removed from cart" });
});

module.exports = router;

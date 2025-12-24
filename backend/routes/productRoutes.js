const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
});

module.exports = router;

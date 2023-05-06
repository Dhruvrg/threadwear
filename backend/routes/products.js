const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { body, validationResult } = require("express-validator");

//Route 1 - allProducts
router.get("/fetchallproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

//Route 2 - Add Product
router.post(
  "/addproduct",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters"),
    body("price", "Enter a price"),
    body("oldPrice", "Enter previous price"),
    body("url", "Enter link for Image"),
    body("size", "Enter sizes for t-shirt"),
    body("star", "Enter star"),
  ],
  async (req, res) => {
    try {
      const { title, description, price, oldPrice, url, size, star } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const product = new Product({
        title,
        description,
        price,
        oldPrice,
        url,
        size,
        star,
      });
      const saveProducts = await product.save();
      res.json(saveProducts);
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3 - update product
router.put("/updateproduct/:id", async (req, res) => {
  const { star } = req.body;
  try {
    const newProduct = {};
    if (star) {
      newProduct.star = star;
    }

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Not Found");
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json({ product });
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

module.exports = router;

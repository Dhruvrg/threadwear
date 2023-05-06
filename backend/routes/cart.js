const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Cart = require("../models/Cart");
var fetchuser = require("../middleware/fetchuser");

//Route 1 - Get all products from cart
router.get("/fetchallproductsfromcart", fetchuser, async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.user.id });
    res.json(carts);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

//Route 2 - Add product to cart
router.post(
  "/addtocart/:id",
  fetchuser,
  [body("quantity", "Enter no. of units").isLength({ min: 1 })],
  async (req, res) => {
    try {
      const { quantity } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const carts = new Cart({
        user: req.user.id,
        quantity,
        productId: req.params.id,
      });
      const saveCart = await carts.save();
      res.json(saveCart);
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3 - update cart
router.put("/updatecart/:id", fetchuser, async (req, res) => {
  const { quantity } = req.body;
  try {
    const newCart = {};
    if (quantity) {
      newCart.quantity = quantity;
    }

    let cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).send("Not Found");
    }

    if (cart.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: newCart },
      { new: true }
    );
    res.json({ cart });
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

//Route 4 - delete product from cart
router.delete("/deletefromcart/:id", fetchuser, async (req, res) => {
  try {
    let cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).send("Not Found");
    }

    if (cart.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    cart = await Cart.findByIdAndDelete(req.params.id);
    res.json({ Success: "Product has been deleted from cart", cart: cart });
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

module.exports = router;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  quantity: {
    type: Number,
    require: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cart", CartSchema);

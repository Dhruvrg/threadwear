const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  url: {
    type: String,
    required: true,
  },
  url: [
    {
      type: String,
    },
  ],
  size: [
    {
      type: Number,
    },
  ],
  star: [
    {
      type: Number,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", ProductSchema);

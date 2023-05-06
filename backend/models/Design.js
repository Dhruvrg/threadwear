const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema means structure of database
const DesignSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("design", DesignSchema);

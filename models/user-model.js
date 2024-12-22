const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  cart: {
    type: Array,
    default: [],
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  picture: String,
});

module.exports = mongoose.model("user", userSchema)
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  cart: {
    type: Array,
    default: []
  },
  orders: {
    type: Array,
    default: []
  },
  isAdmin: Boolean,
  picture: String
})

module.exports = mongoose.model("user", userSchema)
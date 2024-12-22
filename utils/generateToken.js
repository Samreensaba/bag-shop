const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const generateToken = (user) => {
  let token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
};

module.exports.generateToken = generateToken;

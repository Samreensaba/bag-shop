const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { generateToken } = require("../utils/generateToken");
const productModel = require("../models/product-model");

module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({email: email})

    if (user) {
      req.flash("error", "You already have an account. Please login")
      return res.redirect("/");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("success", "User created sucessfully")
          return res.redirect("/")
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};


module.exports.loginUser = async function(req, res){
  let {email, password} = req.body
  let user = await userModel.findOne({email: email})
  if (!user) {
     req.flash("error","Email or password incorrect");
     return res.redirect("/")
  }

  bcrypt.compare(password, user.password, async function(err, result){
    if (result){
      let token = generateToken(user);
      res.cookie("token", token);
      let products = await productModel.find()
      let success = req.flash("success")
      res.render("shop", {products, success})
    }
    else{
      req.flash("error","Email or password incorrect");
      return res.redirect("/")
    } 

  })

}


module.exports.logout = async function(req, res){
  res.cookie("token", "")
  res.redirect("/")
}

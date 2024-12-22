const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const config = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index")
const expressSession = require('express-session')
const flash = require('connect-flash')

require('dotenv').config()

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));
app.use(cookieParser());


app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash())
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);
app.use("/", indexRouter)

app.listen(3000);

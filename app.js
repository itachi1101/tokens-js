const express = require("express");
const mongoose = require("mongoose");
const { append } = require("express/lib/response");
const cookieParser=require('cookie-parser')
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(cookieParser());
app.get("*",checkUser)
mongoose.connect("mongodb://localhost:27017/jwtDB", { useNewUrlParser: true });
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/smoothies",requireAuth, (req, res) => {
  res.render("smoothies");
});
app.use(authRoutes);
app.listen(3000, () => {
  console.log("Server Started on port 3000");
});

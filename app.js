const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const trySchema = new mongoose.Schema({
  name: String,
});
const item = mongoose.model("second", trySchema);
/*const item = mongoose.model("task", trySchema);
const todo = new item({
  name: "create some videos",
});
const todo2 = new item({
  name: "learn DSA",
});
const todo3 = new item({
  name: "learn React",
});
const todo4 = new item({
  name: "Take some rest",
});*/
//todo.save();
//item.insertMany([todo2, todo3, todo4]);
app.get("/", function (req, res) {
  item
    .find()
    .then(function (foundItems) {
      res.render("list", { ejes: foundItems });
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.post("/", function (req, res) {
  const itemName = req.body.ele1;
  const todo4 = new item({
    name: itemName,
  });
  todo4.save();
  res.redirect("/");
});
app.post("/delete", function (req, res) {
  const checked = req.body.checkbox1;
  item
    .findByIdAndDelete(checked)
    .then(function () {
      console.log("deleted!");
      res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.listen("8000", function () {
  console.log("server is running");
});

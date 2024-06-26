//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

console.log(date);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let items = ["buy food", "cook food", "eat food"];
let workItems = [];

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("lists", {
    listTitle: day, 
    newListItems: items,
  });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("lists", {
    listTitle: "Work List",
    newListItems: workItems,
  });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});

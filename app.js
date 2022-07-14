const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))
app.set('view engine', 'ejs');


const items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];


app.get("/", function(req, res) {

  let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  let newItem = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(newItem);
    res.redirect("/work");
  }else{
    items.push(newItem);
    res.redirect("/");
  }
})


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});


app.listen("3000", function() {
  console.log("Listening on port 3000");
})

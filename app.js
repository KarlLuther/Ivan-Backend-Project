const express = require("express");
const app = express();

//FUNCTIONS//
const { getCategories } = require("./controllers/getCategories-controller");

app.get("/api", (req, res) => {
  res.status(200).send({ message: "all okay" });
});

app.get("/api/categories", getCategories);

app.use((req, res, next) => {
  res.status(404).send({ msg: "404: Sorry can't find that!" });
});

module.exports = app;

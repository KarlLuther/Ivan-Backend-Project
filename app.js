const express = require("express");
const app = express();

//FUNCTIONS//
const { getCategories } = require("./controllers/getCategories-controller");
const { getReviewById } = require("./controllers/getReviewById-controller");
const { getReviews } = require("./controllers/getReviews-controller");
const {
  getReviewComments,
} = require("./controllers/getReviewComments-controller");

app.get("/api", (req, res) => {
  res.status(200).send({ message: "all okay" });
});

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getReviewComments);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: `404: ${err.msg}` });
  }
  if (err.code === "22P02") {
    res.status(400).send({ msg: `400: ill-formed request` });
  }
  next();
});

app.use((req, res, next) => {
  res.status(404).send({ msg: "404: Sorry can't find that!" });
});

module.exports = app;

const express = require("express");
const app = express();

const { getCategories } = require("./controllers/getCategories-controller");
const { getReviewById } = require("./controllers/getReviewById-controller");
const { getReviews } = require("./controllers/getReviews-controller");
const { patchReview } = require("./controllers/patchReview-controller");
const { postComment } = require("./controllers/postComment-controller");
const {
  getReviewComments,
} = require("./controllers/getReviewComments-controller");
const { deleteComment } = require("./controllers/deleteComment-controller");
const { getUsers } = require("./controllers/getUsers-controller");

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({ message: "all okay" });
});

//GET REQUESTS

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getReviewComments);

app.get("/api/users", getUsers);

//PATCH REQUESTS

app.patch("/api/reviews/:review_id", patchReview);

//POST REQUESTS

app.post("/api/reviews/:review_id/comments", postComment);

//DELETE REQUESTS

app.delete("/api/comments/:comment_id", deleteComment);

//GET ERROR HANDLING

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: `404: ${err.msg}` });
  }
  if (err.code === "22P02") {
    res.status(400).send({ msg: `400: ill-formed request` });
  }
  next(err);
});

//POST ERROR HANDLING

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({
      msg: `404: no review was found for the specified review_id or specified username does not exist in the system`,
    });
  }
  next(err);
});

app.use((req, res, next) => {
  res.status(404).send({ msg: "404: Sorry can't find that!" });
});

module.exports = app;

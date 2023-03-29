const { fetchReviews } = require("../models/fetchReviews-model");

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviewsArray) => {
      res.status(200).send({ reviews: reviewsArray });
    })
    .catch((err) => {
      next(err);
    });
};

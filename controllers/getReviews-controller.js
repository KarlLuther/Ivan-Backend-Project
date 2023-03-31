const { fetchReviews } = require("../models/fetchReviews-model");

exports.getReviews = (req, res, next) => {
  const order = req.query.order;
  fetchReviews(order)
    .then((reviewsArray) => {
      res.status(200).send({ reviews: reviewsArray });
    })
    .catch((err) => {
      next(err);
    });
};

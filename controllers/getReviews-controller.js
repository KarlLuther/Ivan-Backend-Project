const { fetchReviews } = require("../models/fetchReviews-model");

exports.getReviews = (req, res, next) => {
  const order = req.query.order;
  const sortBy = req.query.sort_by;
  const categoryToSelect = req.query.category;
  fetchReviews(order, sortBy, categoryToSelect)
    .then((reviewsArray) => {
      res.status(200).send({ reviews: reviewsArray });
    })
    .catch((err) => {
      next(err);
    });
};

const { fetchReviewById } = require("../models/fetchReviewById-model");

exports.getReviewById = (req, res, next) => {
  const { params } = req;
  const id = params.review_id;
  fetchReviewById(id)
    .then((reviewData) => {
      res.status(200).send({ reviewObject: reviewData[0] });
    })
    .catch((err) => {
      if (err.code === "22P02") {
        next(err);
      } else {
        next(err);
      }
    });
};

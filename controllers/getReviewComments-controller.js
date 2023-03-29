const { fetchReviewComments } = require("../models/fetchReviewComments-model");

exports.getReviewComments = (req, res, next) => {
  const { params } = req;
  const id = params.review_id;
  fetchReviewComments(id)
    .then((commentsArray) => {
      res.status(200).send({ comments: commentsArray });
    })
    .catch((err) => {
      next(err);
    });
};

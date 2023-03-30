const { changeReviewVotes } = require("../models/changeReviewVotes-model");

exports.patchReview = (req, res, next) => {
  const { params } = req;
  const reviewId = params.review_id;
  const reqBody = req.body;

  changeReviewVotes(reviewId, reqBody)
    .then((patchedReviewArray) => {
      res.status(200).send({ updatedReview: patchedReviewArray[0] });
    })
    .catch((err) => {
      if (
        err.reasonForError === "random properties" ||
        err.reasonForError === "no inc_votes property"
      ) {
        res.status(400).send({ msg: err.msg });
      }
      next(err);
    });
};

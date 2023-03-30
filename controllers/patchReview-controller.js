const { changeReviewVotes } = require("../models/changeReviewVotes-model");

exports.patchReview = (req, res, next) => {
  const { params } = req;
  const reviewId = params.review_id;
  const numberOfVotesToAdd = req.body.inc_votes;
  const parsedBodyKeys = Object.keys(req.body);
  const validPropertiesToParse = ["inc_votes"];

  for (let key of parsedBodyKeys) {
    if (!validPropertiesToParse.includes(key)) {
      res.status(400).send({ msg: "400: Some other property on request body" });
    }
  }

  if (!parsedBodyKeys.includes("inc_votes")) {
    res
      .status(400)
      .send({ msg: "400: Request body does not contain inc_votes property" });
  }
  // } else if (!parsedBodyKeys.includes("username")) {
  //   res
  //     .status(400)
  //     .send({ msg: "400: Request body does not contain username property" });
  // }

  changeReviewVotes(reviewId, numberOfVotesToAdd)
    .then((patchedReviewArray) => {
      res.status(200).send({ updatedReview: patchedReviewArray[0] });
    })
    .catch((err) => {
      next(err);
    });
};

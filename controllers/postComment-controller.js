const { addComment } = require("../models/addComment-model");

exports.postComment = (req, res, next) => {
  const { params } = req;
  const reviewId = params.review_id;
  const reqBody = req.body;
  const parsedBodyKeys = Object.keys(reqBody);
  const validPropertiesToParse = ["username", "body"];

  for (let key of parsedBodyKeys) {
    if (!validPropertiesToParse.includes(key)) {
      res.status(400).send({ msg: "400: Some other property on request body" });
    }
  }

  if (!parsedBodyKeys.includes("body")) {
    res
      .status(400)
      .send({ msg: "400: Request body does not contain body property" });
  } else if (!parsedBodyKeys.includes("username")) {
    res
      .status(400)
      .send({ msg: "400: Request body does not contain username property" });
  }

  addComment(reviewId, reqBody)
    .then((addedCommentArray) => {
      res.status(201).send({ postedComment: addedCommentArray[0] });
    })
    .catch((err) => {
      next(err);
    });
};

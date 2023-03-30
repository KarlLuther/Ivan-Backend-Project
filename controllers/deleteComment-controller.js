const { removeComment } = require("../models/removeComment-model");

exports.deleteComment = (req, res, next) => {
  const { params } = req;
  const id = params.comment_id;
  removeComment(id)
    .then((rows) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

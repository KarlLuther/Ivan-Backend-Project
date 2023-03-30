const db = require("../db/connection.js");

exports.changeReviewVotes = (reviewId, numberOfVotesToAdd) => {
  return db
    .query(
      `
      UPDATE reviews
      SET votes = votes + $1
      WHERE review_id = $2
      RETURNING review_id, title, category, designer, owner, review_body, review_img_url, created_at, votes;
  `,
      [numberOfVotesToAdd, reviewId]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `no review was found for the specified review_id`,
        });
      }
      return rows;
    });
};

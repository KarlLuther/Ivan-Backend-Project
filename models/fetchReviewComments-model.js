const db = require("../db/connection.js");

exports.fetchReviewComments = (id) => {
  return db
    .query(
      `
      SELECT * FROM comments
      WHERE review_id = $1
      ORDER By created_at DESC;
  `,
      [id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `No comments found for review_id: ${id}`,
        });
      }
      return rows;
    });
};

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
      return rows;
    });
};

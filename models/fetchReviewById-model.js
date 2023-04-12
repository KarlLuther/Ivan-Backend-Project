const db = require("../db/connection.js");

exports.fetchReviewById = (id) => {
  return db
    .query(
      `
      SELECT
      reviews.title,
  reviews.designer,
  reviews.owner,
  reviews.review_img_url,
  reviews.category,
  reviews.created_at,
  reviews.votes,
  reviews.review_body,
  reviews.review_id,
  COUNT(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments
      ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;
  `,
      [id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `No user found for user_id: ${id}`,
        });
      }
      return rows;
    });
};

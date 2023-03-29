const db = require("../db/connection.js");

exports.addComment = (reviewId, reqBody) => {
  const { username, body } = reqBody;
  return db
    .query(
      `
  INSERT INTO comments(body,review_id,author,votes)
VALUES ($1, $2, $3, 0)
RETURNING review_id, comment_id, author, body, votes, created_at;
  `,
      [body, reviewId, username]
    )
    .then(({ rows }) => {
      return rows;
    });
};

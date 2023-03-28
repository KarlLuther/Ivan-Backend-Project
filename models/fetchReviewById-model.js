const db = require("../db/connection.js");

exports.fetchReviewById = (id) => {
  return db
    .query(
      `
  SELECT * FROM reviews
  WHERE review_id = $1; 
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

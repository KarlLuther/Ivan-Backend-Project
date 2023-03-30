const db = require("../db/connection.js");

exports.removeComment = (id) => {
  return db
    .query(
      `
      DELETE FROM comments WHERE comment_id = $1 RETURNING *;
  `,
      [id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `No comment found for specified id: ${id}`,
        });
      }
      return rows;
    });
};

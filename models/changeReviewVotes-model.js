const db = require("../db/connection.js");

exports.changeReviewVotes = (reviewId, reqBody) => {
  const numberOfVotesToAdd = reqBody.inc_votes;
  const parsedBodyKeys = Object.keys(reqBody);
  const validPropertiesToParse = ["inc_votes"];

  for (let key of parsedBodyKeys) {
    if (!validPropertiesToParse.includes(key)) {
      return Promise.reject({
        status: 400,
        msg: "400: Some other property on request body",
        reasonForError: "random properties",
      });
    }
  }

  if (!parsedBodyKeys.includes("inc_votes")) {
    return Promise.reject({
      status: 400,
      msg: "400: Request body does not contain inc_votes property",
      reasonForError: "no inc_votes property",
    });
  }

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

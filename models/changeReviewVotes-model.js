const db = require("../db/connection.js");

exports.changeReviewVotes = (reviewId, numberOfVotesToAdd) => {
  // const { inc_votes } = reqBody;
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

// [
//   {
//     review_id: 1,
//     title: 'Agricola',
//     category: 'euro game',
//     designer: 'Uwe Rosenberg',
//     owner: 'mallionaire',
//     review_body: 'Farmyard fun!',
//     review_img_url: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
//     created_at: 2021-01-18T10:00:20.514Z,
//     votes: 2
//   }
// ]

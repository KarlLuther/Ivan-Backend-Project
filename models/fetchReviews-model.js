const db = require("../db/connection.js");

exports.fetchReviews = () => {
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
  reviews.review_id,
  COUNT(comments.comment_id) AS comment_count
      FROM reviews
      LEFT JOIN comments
      ON reviews.review_id = comments.review_id
      GROUP BY reviews.review_id
      ORDER BY created_at DESC;
  `
    )
    .then(({ rows }) => {
      return rows;
    });
};

// SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;

// SELECT column_name(s)
// FROM table1
// LEFT JOIN table2
// ON table1.column_name = table2.column_name;

// function fetchReviewsComments() {
//   return db
//     .query(
//       `
//     SELECT review_id FROM comments;
//     `
//     )
//     .then(({ rows }) => {
//       return rows;
//     });
// }

// exports.fetchReviews = () => {
//   return Promise.all([fetchReviewsComments(), fetchReviewsData()]).then(
//     (result) => {
//       const reviewCommentsArray = result[0];
//       const reviewsArray = result[1];
//       const countObject = {};
//       for (let idObject of reviewCommentsArray) {
//         let { review_id } = idObject;
//         if (countObject[review_id]) {
//           countObject[review_id]++;
//         } else {
//           countObject[review_id] = 1;
//         }
//       }
//       // for (let review of reviewsArray) {
//       //   review.comment_count = countObject[review_id]
//       //     ? countObject[review_id]
//       //     : 0;
//       // }
//       reviewsArray.forEach((review) => {
//         if (countObject[review.review_id]) {
//           review.comment_count += countObject[review_id];
//         } else {
//           review.comment_count = 1;
//         }
//       });
//       console.log("shooo");
//       console.log(reviewsArray[0]);
//       console.log(reviewsArray[1]);
//     }
//   );
// };

const db = require("../db/connection.js");

exports.fetchReviews = (
  order = "DESC",
  sortBy = "created_at",
  categoryToSelect = "undefined"
) => {
  const allowedInserionValues = [
    "DESC",
    "ASC",
    "created_at",
    "votes",
    "review_id",
    "comment_count",
  ];
  const params = [order, sortBy];

  let reject;

  params.forEach((paramValue) => {
    if (!allowedInserionValues.includes(paramValue)) {
      reject = Promise.reject({
        status: 400,
        msg: `Ill-formed request`,
      });
    }
  });

  if (reject !== undefined) {
    return reject;
  }

  return db
    .query(
      `
  SELECT DISTINCT category
  FROM reviews;
  `
    )
    .then(({ rows }) => {
      const tableCategories = [];
      rows.forEach((categoryObj) => {
        tableCategories.push(categoryObj.category);
      });
      tableCategories.push("undefined");
      if (!tableCategories.includes(categoryToSelect)) {
        return Promise.reject({
          status: 400,
          msg: `Ill-formed request`,
        });
      }
    })
    .then(() => {
      const categoryQuery =
        categoryToSelect !== "undefined"
          ? `
      WHERE 
      category = '${categoryToSelect}'
      `
          : "";

      const theQuery = `      SELECT
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
      ${categoryQuery}
      GROUP BY reviews.review_id
      ORDER BY ${sortBy} ${order};
    `;

      return db.query(theQuery).then(({ rows }) => {
        return rows;
      });
    });
};

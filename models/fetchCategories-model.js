const db = require("../db/connection");

exports.fetchCategories = () => {
  return db
    .query(
      `
    SELECT * FROM categories;
      `
    )
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};

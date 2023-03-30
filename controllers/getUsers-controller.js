const { fetchUsers } = require("../models/fetchUsers-model");

exports.getUsers = (req, res) => {
  fetchUsers().then(({ rows }) => {
    res.status(200).send({ users: rows });
  });
};

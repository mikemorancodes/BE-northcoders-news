const { User } = require("../models");

exports.getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username }).then(user => {
    user ? res.send({ user }) : next({ status: 400, message: "invalid username" });
  });
};

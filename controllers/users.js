const { User } = require("../models");

exports.getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username }).then(user => res.send({ user }));
};

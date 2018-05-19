const { User } = require("../models");

exports.getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .select("-password")
    .then(
      user => (user ? res.send({ user }) : next({ status: 400, message: "invalid username" }))
    );
};

exports.createUser = (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => User.findOne({ _id: user._id }).select("-password"))
    .then(user => res.status(201).send({ user }))
    .catch(err => next({ status: 400, message: "invalid parameters" }));
};

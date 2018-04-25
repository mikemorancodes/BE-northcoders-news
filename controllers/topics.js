const { Topic } = require("../models");

exports.getAllTopics = (req, res, next) => {
  Topic.find().then(topics => res.send({ topics }));
};

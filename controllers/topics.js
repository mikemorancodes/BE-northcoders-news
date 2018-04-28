const { Topic, Article } = require("../models");
const mongoose = require("mongoose");

exports.getAllTopics = (req, res, next) => {
  Topic.find().then(topics => res.send({ topics }));
};

exports.getArticlesByTopicId = (req, res, next) => {
  Article.find(req.params)
    .populate("created_by", "-_id -__v")
    .populate("belongs_to", "-_id -__v")
    .then(articles => res.send({ articles }))
    .catch(err => next({ status: 400, message: "invalid article id" }));
};

exports.postNewArticle = (req, res, next) => {
  const newArticle = new Article(req.body);
  newArticle
    .save()
    .then(article =>
      Article.findById(article._id)
        .populate("created_by", "-_id -__v")
        .populate("belongs_to", "-_id -__v")
    )
    .then(article => res.status(201).send({ article }))
    .catch(err => next({ status: 400, message: "invalid parameters" }));
};

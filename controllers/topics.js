const { Topic, Article } = require("../models");
const mongoose = require("mongoose");

exports.getAllTopics = (req, res, next) => {
  Topic.find().then(topics => res.send({ topics }));
};

exports.getArticlesByTopicId = (req, res, next) => {
  Article.find(req.params).then(articles => res.send({ articles }));
};

exports.postNewArticle = (req, res, next) => {
  const newArticle = new Article(req.body);
  newArticle.save().then(article => res.status(201).send({ article }));
};

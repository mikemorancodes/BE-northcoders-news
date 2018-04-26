const { Article, Comment } = require("../models");

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .populate("created_by", "-_id -__v")
    .populate("belongs_to", "-_id -__v")
    .then(articles => res.send({ articles }));
};

exports.getArticleById = (req, res, next) => {
  const idQuery = { _id: req.params.article_id };
  Article.findOne(idQuery)
    .populate("created_by", "-_id -__v")
    .populate("belongs_to", "-_id -__v")
    .then(article => res.send({ article }));
};

exports.getCommentsByArticleId = (req, res, next) => {
  const idQuery = { belongs_to: req.params.article_id };
  Comment.find(idQuery)
    .populate("created_by", "-_id -__v")
    .then(comments => res.send({ comments }));
};

exports.getCommentCountByArticleId = (req, res, next) => {
  const idQuery = { _id: req.params.article_id };
  Article.findOne(idQuery).then(({ comment_count }) => res.send({ comment_count }));
};

exports.postNewComment = (req, res, next) => {
  const newComment = new Comment(req.body);
  newComment.save().then(comment => {
    const idQuery = { _id: req.params.article_id };
    Article.findById(idQuery).then(article => {
      article.comment_count++;
      article.save();
      res.status(201).send({ comment });
    });
  });
};

exports.updateVoteCount = (req, res, next) => {
  const idQuery = { _id: req.params.article_id };
  Article.findById(idQuery)
    .then(article => {
      if (req.query.vote === "up") article.votes++;
      else if (req.query.vote === "down") article.votes--;
      return article.save();
    })
    .then(updatedArticle => {
      return Article.findById(idQuery)
        .populate("created_by", "-_id -__v")
        .populate("belongs_to", "-_id -__v");
    })
    .then(updatedArticle => res.status(202).send({ article: updatedArticle }));
};

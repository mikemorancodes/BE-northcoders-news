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
    .then(article => res.send({ article }))
    .catch(err => next({ status: 400, message: "invalid article id" }));
};

exports.getCommentsByArticleId = (req, res, next) => {
  const idQuery = { belongs_to: req.params.article_id };
  Comment.find(idQuery)
    .populate("created_by", "-_id -__v")
    .then(comments => res.send({ comments }))
    .catch(err => next({ status: 400, message: "invalid article id" }));
};

exports.getCommentCountByArticleId = (req, res, next) => {
  const idQuery = { _id: req.params.article_id };
  Article.findOne(idQuery)
    .then(({ comment_count }) => res.send({ comment_count }))
    .catch(err => next({ status: 400, message: "invalid article id" }));
};

exports.postNewComment = (req, res, next) => {
  const newComment = new Comment(req.body);
  newComment
    .save()
    .then(comment =>
      Promise.all([
        Article.findByIdAndUpdate(comment.belongs_to, { $inc: { comment_count: 1 } }),
        Comment.findOne({ _id: comment._id }).populate("created_by", "-_id -__v")
      ])
    )
    .then(([article, comment]) => {
      res.status(201).send({ comment });
    })
    .catch(err => next({ status: 400, message: "invalid parameters" }));
};

exports.updateVoteCount = (req, res, next) => {
  const newCount = req.query.vote === "up" ? 1 : req.query.vote === "down" ? -1 : 0;
  Article.findByIdAndUpdate(
    req.params.article_id,
    { $inc: { votes: newCount } },
    { new: true }
  )
    .populate("created_by", "-_id -__v")
    .populate("belongs_to", "-_id -__v")
    .then(updatedArticle => res.status(202).send({ article: updatedArticle }))
    .catch(err => next({ status: 400, message: "invalid article id" }));
};

const { Comment, Article } = require("../models");

exports.updateVoteCount = (req, res, next) => {
  const newCount = req.query.vote === "up" ? 1 : req.query.vote === "down" ? -1 : 0;
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    { $inc: { votes: newCount } },
    { new: true }
  )
    .populate("created_by", "-_id -__v")
    .then(updatedComment => res.status(202).send({ comment: updatedComment }))
    .catch(err => next({ status: 400, message: "invalid comment id" }));
};

exports.removeCommentById = (req, res, next) => {
  Comment.findByIdAndRemove(req.params)
    .then(deletedComment =>
      Promise.all([
        Article.findByIdAndUpdate(deletedComment.belongs_to, { $inc: { comment_count: -1 } }),
        deletedComment._id
      ])
    )
    .then(([article, id]) => {
      res.send({ message: "comment deleted.", id });
    })
    .catch(err => next({ status: 400, message: "invalid comment id" }));
};

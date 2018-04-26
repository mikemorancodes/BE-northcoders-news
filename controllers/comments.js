const { Comment } = require("../models");

exports.updateVoteCount = (req, res, next) => {
  const idQuery = { _id: req.params.comment_id };
  Comment.findById(idQuery)
    .then(comment => {
      if (req.query.vote === "up") comment.votes++;
      else if (req.query.vote === "down") comment.votes--;
      return comment.save();
    })
    .then(updatedComment => {
      return Comment.findById(idQuery).populate("created_by", "-_id -__v");
    })
    .then(updatedComment => res.status(202).send({ comment: updatedComment }));
};

exports.removeCommentById = (req, res, next) => {
  Comment.findByIdAndRemove(req.params).then(() => res.send(`doc ${req.params._id} deleted.`));
};

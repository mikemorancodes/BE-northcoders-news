const { updateVoteCount, removeCommentById } = require("../controllers/comments");

const router = require("express").Router();

router.put("/:comment_id", updateVoteCount);

router.delete("/:_id", removeCommentById);

module.exports = router;

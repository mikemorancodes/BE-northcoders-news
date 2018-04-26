const router = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postNewComment,
  updateVoteCount,
  getCommentCountByArticleId
} = require("../controllers/articles");

router.get("/", getAllArticles);

router.get("/:article_id", getArticleById);

router.get("/:article_id/comments", getCommentsByArticleId);

router.get("/:article_id/comment_count", getCommentCountByArticleId);

router.post("/:article_id/comments", postNewComment);

router.put("/:article_id", updateVoteCount);

module.exports = router;

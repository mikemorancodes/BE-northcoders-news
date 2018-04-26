const router = require("express").Router();
const {
  getAllTopics,
  getArticlesByTopicId,
  postNewArticle
} = require("../controllers/topics");

router.get("/", getAllTopics);

router.get("/:belongs_to/articles", getArticlesByTopicId);

router.post("/:belongs_to/articles", postNewArticle);

module.exports = router;

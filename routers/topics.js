const router = require("express").Router();
const { getAllTopics } = require("../controllers/topics");

router.get("/", getAllTopics);

router.get("/:topic_id/articles");

router.post("/:topic_id/articles");

module.exports = router;

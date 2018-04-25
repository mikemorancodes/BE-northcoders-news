const router = require("express").Router();

router.get("/");

router.get("/:topic_id/articles");

router.post("/:topic_id/articles");

module.exports = router;

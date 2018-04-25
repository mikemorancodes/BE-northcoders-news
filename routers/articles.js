const router = require("express").Router();

router.get("/");

router.get("/:article_id");

router.get("/:article_id/comments");

router.post("/:article_id/comments");

router.put("/:article_id");

module.exports = router;

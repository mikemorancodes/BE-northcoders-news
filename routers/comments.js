const router = require("express").Router();

router.get("/");

router.put("/:comment_id");

router.delete("/:comment_id");

module.exports = router;

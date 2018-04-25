const router = require("express").Router();
const { articlesRouter, commentsRouter, topicsRouter, usersRouter } = require("./");

router.get("/", (req, res) => {
  res.sendFile(__dirname.replace("routers", "views/home.html"));
});

router.use("/articles", articlesRouter);

router.use("/topics", topicsRouter);

router.use("/users", usersRouter);

router.use("/comments", commentsRouter);

module.exports = router;

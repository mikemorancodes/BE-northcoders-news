const router = require("express").Router();
const { articlesRouter, commentsRouter, topicsRouter, usersRouter } = require("./");
const homePage = require("../views/home.js");

router.get("/", (req, res) => {
  res.send(homePage);
});

router.use("/articles", articlesRouter);

router.use("/topics", topicsRouter);

router.use("/users", usersRouter);

router.use("/comments", commentsRouter);

module.exports = router;

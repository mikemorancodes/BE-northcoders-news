const express = require("express");
const app = express();
const apiRouter = require("./routers/api");
const DB_URL = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(DB_URL).then(() => console.log(`connected to ${DB_URL}`));

app.use(express.static("views"));

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => next({ status: 404 }));

//error handling

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 404) res.status(404).send({ msg: "page not found" });
  else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;

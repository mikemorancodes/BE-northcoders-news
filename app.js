const express = require("express");
const app = express();
const apiRouter = require("./routers/api");
const DB_URL = process.env.DB_URL || require("./config").DB_URL;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(DB_URL).then(() => console.log(`connected to ${DB_URL}`));

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => next({ status: 404 }));

//error handling

app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ message: "page not found" });
  else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 400) res.status(400).send({ message: err.message || "bad request" });
  else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
});

module.exports = app;

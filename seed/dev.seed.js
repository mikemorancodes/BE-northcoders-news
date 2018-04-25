const mongoose = require("mongoose");
const { topicData, articleData, userData } = require("./devData");
const seedDB = require("./seed");

mongoose
  .connect("mongodb://localhost:27017/nc_news")
  .then(() => {
    return seedDB(topicData, articleData, userData);
  })
  .then(() => {
    mongoose.disconnect();
  });

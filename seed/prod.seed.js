const mongoose = require("mongoose");
const { topicData, articleData, userData } = require("./devData");
const seedDB = require("./seed");
const { DB_URL } = require("../config/production");

mongoose
  .connect(DB_URL)
  .then(() => {
    return seedDB(topicData, articleData, userData);
  })
  .then(() => {
    mongoose.disconnect();
  });

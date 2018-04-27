const mongoose = require("mongoose");
const { Topic, Article, User, Comment } = require("../models");
const { formatArticleData, createIdReferenceObject, createComments } = require("./utils");

function seedDB(topicData, articleData, userData) {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([Topic.insertMany(topicData), User.insertMany(userData)]);
    })
    .then(([topicDocs, userDocs]) => {
      console.log(`Inserted ${topicDocs.length} topics and ${userDocs.length} users!`);
      const topicRef = createIdReferenceObject(topicDocs, "slug");
      const formattedArticles = formatArticleData(articleData, topicRef, userDocs);
      return Promise.all([Article.insertMany(formattedArticles), userDocs, topicDocs]);
    })
    .then(([articleDocs, userDocs, topicDocs]) => {
      console.log(`Inserted ${articleDocs.length} articles!`);
      const comments = createComments(articleDocs, userDocs);
      return Promise.all([Comment.insertMany(comments), articleDocs, userDocs, topicDocs]);
    })
    .then(allDocs => {
      console.log(`Inserted ${allDocs[0].length} comments!`);
      return allDocs;
    });
}

module.exports = seedDB;

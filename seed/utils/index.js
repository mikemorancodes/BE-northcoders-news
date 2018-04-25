const faker = require("faker");
const { random } = require("lodash");

exports.formatArticleData = (articleData, topicRefs, userDocs) => {
  return articleData.map(article => {
    const { title, body, topic } = article;
    const userIndex = process.env.NODE_ENV ? 0 : random(userDocs.length - 1);
    const userId = userDocs[userIndex]._id;
    return {
      title,
      body,
      belongs_to: topicRefs[topic],
      created_by: userId
    };
  });
};

exports.createIdReferenceObject = (docs, refProp) => {
  return docs.reduce((acc, obj) => {
    acc[obj[refProp]] = obj._id;
    return acc;
  }, {});
};

exports.createRandomComment = (article, user) => {
  return {
    body: faker.lorem.paragraph(),
    belongs_to: article._id,
    created_at: new Date(faker.date.recent()).getTime(),
    created_by: user._id
  };
};

exports.createTestComment = (article, user) => {
  return {
    body: "There's nothing better than a good test database!",
    belongs_to: article._id,
    created_at: 1524663879114,
    created_by: user._id
  };
};

exports.createComments = (articleDocs, userDocs) => {
  return articleDocs.reduce((acc, article) => {
    for (let i = 0; i < 3; i++) {
      if (process.env.NODE_ENV) acc.push(this.createTestComment(article, userDocs[0]));
      else acc.push(this.createRandomComment(article, userDocs[random(userDocs.length - 1)]));
    }
    return acc;
  }, []);
};

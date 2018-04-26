const faker = require("faker");
const { random } = require("lodash");

const createRandomComment = (article, user) => {
  return {
    body: faker.lorem.paragraph(),
    belongs_to: article._id,
    created_at: new Date(faker.date.recent()).getTime(),
    created_by: user._id
  };
};

const createTestComment = (article, user) => {
  return {
    body: "There's nothing better than a good test database!",
    belongs_to: article._id,
    created_at: 1524663879114,
    created_by: user._id
  };
};

exports.createComments = (articleDocs, userDocs) => {
  const comments = articleDocs.reduce((acc, article, i) => {
    const limit = process.env.NODE_ENV ? 3 : random(10);
    for (let i = 0; i < limit; i++) {
      if (process.env.NODE_ENV) acc.push(createTestComment(article, userDocs[0]));
      else acc.push(createRandomComment(article, userDocs[random(userDocs.length - 1)]));
      articleDocs[i].comment_count++;
    }
    return acc;
  }, []);
  return { comments, updatedArticles: articleDocs };
};

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

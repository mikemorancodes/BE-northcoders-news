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
  return articleDocs.reduce((acc, article, i) => {
    for (let i = 0; i < article.comment_count; i++) {
      if (process.env.NODE_ENV === "test") acc.push(createTestComment(article, userDocs[0]));
      else acc.push(createRandomComment(article, userDocs[random(userDocs.length - 1)]));
    }
    return acc;
  }, []);
};

exports.formatArticleData = (articleData, topicRefs, userDocs) => {
  return articleData.map(article => {
    const { title, body, topic } = article;
    let userId, commentCount;
    if (process.env.NODE_ENV === "test") {
      userId = userDocs[0]._id;
      commentCount = 3;
    } else {
      userId = userDocs[random(userDocs.length - 1)];
      commentCount = random(10);
    }
    return {
      title,
      body,
      belongs_to: topicRefs[topic],
      created_by: userId,
      comment_count: commentCount
    };
  });
};

exports.createIdReferenceObject = (docs, refProp) => {
  return docs.reduce((acc, obj) => {
    acc[obj[refProp]] = obj._id;
    return acc;
  }, {});
};

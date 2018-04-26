process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const { topicData, articleData, userData } = require("../seed/testData");

describe("/api", function() {
  this.timeout(10000);
  let commentDocs, articleDocs, userDocs, topicDocs;
  beforeEach(() => {
    return seedDB(topicData, articleData, userData).then(
      allDocs => ([commentDocs, articleDocs, userDocs, topicDocs] = allDocs)
    );
  });
  after(() => mongoose.disconnect());
  describe("/topics", () => {
    it("get /topics returns all the topics", () => {
      return request
        .get(`/api/topics`)
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics.length).to.equal(2);
          expect(topics[0].slug).to.equal(topicData[0].slug);
        });
    });
    it("get /topics/:belongs_to/articles returns all articles for topic", () => {
      const [coding] = topicDocs;
      return request
        .get(`/api/topics/${coding._id}/articles`)
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0].belongs_to).to.equal(coding._id.toString());
          expect(articles.length).to.equal(2);
        });
    });
    it("post /topics/:belongs_to/articles returns posted article", () => {
      const footballId = topicDocs[1]._id.toString();
      const testArticle = {
        title: "Liverpool throw first big cup opportunity in 15 years",
        body: "Typical. Everyone knew this was going to happen.",
        belongs_to: footballId,
        created_by: userDocs[1]._id
      };
      const expKeys = ["title", "body", "belongs_to", "votes", "created_by"];
      return request
        .post(`/api/topics/${footballId}/articles`)
        .send(testArticle)
        .expect(201)
        .then(({ body: { article } }) => {
          expect(article).to.include.all.keys(...expKeys);
        });
    });
  });
  describe("/articles", () => {
    it("get api/articles returns all the articles", () => {
      return request
        .get(`/api/articles`)
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).to.equal(4);
          expect(articles[0].created_by.name).to.equal("jonny");
          expect(articles[0].belongs_to.slug).to.equal("mitch");
        });
    });
    it("get api/articles/:article_id returns the article specified by id", () => {
      const [testArticle] = articleDocs;
      const expKeys = ["title", "body", "belongs_to", "votes", "created_by"];
      return request
        .get(`/api/articles/${testArticle._id}`)
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).to.include.all.keys(...expKeys);
          expect(article.created_by.name).to.equal("jonny");
          expect(article.belongs_to.slug).to.equal("mitch");
        });
    });
    it("get /api/articles/:article_id/comments gets all comments for a specific article", () => {
      const [testArticle] = articleDocs;
      return request
        .get(`/api/articles/${testArticle._id}/comments`)
        .expect(200)
        .then(({ body: { comments } }) => {
          const [comment] = comments;
          const expCommentKeys = ["body", "belongs_to", "created_at", "votes", "created_by"];
          const expUserKeys = ["username", "name", "avatar_url"];
          expect(comments.length).to.equal(3);
          expect(comment).to.include.all.keys(...expCommentKeys);
          expect(comment.created_by.name).to.equal(userDocs[0].name);
          expect(comment.body).to.equal("There's nothing better than a good test database!");
          expect(comment.created_by).to.have.all.keys(...expUserKeys);
        });
    });
    it.only("get /articles/:article_id/comment_count returns number of comments for article", () => {
      console.log(articleDocs);
      const [testArticle] = articleDocs;
      return request
        .get(`/api/articles/${testArticle._id}/comment_count`)
        .expect(200)
        .then(({ body: { comment_count } }) => {
          expect(comment_count).to.equal(3);
        });
    });
    it("post /articles/:article_id/comments returns posted article", () => {
      const [testArticle] = articleDocs;
      const testComment = {
        body: "I love cake.",
        belongs_to: topicDocs[0]._id,
        created_by: userDocs[1]._id
      };
      const expKeys = ["body", "belongs_to", "created_by"];
      return request
        .post(`/api/articles/${testArticle._id}/comments`)
        .send(testComment)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment).to.include.all.keys(...expKeys);
          expect(comment.body).to.equal(testComment.body);
        });
    });
    it("put api/articles/:article_id?vote=up increments vote on article", () => {
      const [testArticle] = articleDocs;
      return request
        .put(`/api/articles/${testArticle._id}/?vote=up`)
        .expect(202)
        .then(({ body: { article } }) => {
          expect(article.votes).to.equal(1);
        });
    });
    it("put api/articles/:article_id?vote=down decrements vote on article", () => {
      const [testArticle] = articleDocs;
      return request
        .put(`/api/articles/${testArticle._id}/?vote=down`)
        .expect(202)
        .then(({ body: { article } }) => {
          expect(article.votes).to.equal(-1);
        });
    });
  });
  describe("/comments", () => {
    it("put api/comments/:comment_id?vote=up increments vote on comment", () => {
      const [testComment] = commentDocs;
      return request
        .put(`/api/comments/${testComment._id}/?vote=up`)
        .expect(202)
        .then(({ body: { comment } }) => {
          expect(comment.votes).to.equal(1);
        });
    });
    it("put api/comments/:comment_id?vote=down decrements vote on comment", () => {
      const [testComment] = commentDocs;
      return request
        .put(`/api/comments/${testComment._id}/?vote=down`)
        .expect(202)
        .then(({ body: { comment } }) => {
          expect(comment.votes).to.equal(-1);
        });
    });
    it("delete api/comments/:comment_id deletes the comment by id", () => {
      const [testComment] = commentDocs;
      return request
        .delete(`/api/comments/${testComment._id}`)
        .expect(200)
        .then(({ text }) => {
          expect(text).to.equal(`doc ${testComment._id} deleted.`);
        });
    });
    describe("/users", () => {
      it("get api/users/:username returns user by username", () => {
        const username = userDocs[0].username;
        const expKeys = ["username", "name", "avatar_url"];
        return request
          .get(`/api/users/${username}`)
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user.name).to.equal("jonny");
            expect(user).to.include.all.keys(expKeys);
          });
      });
    });
  });
});

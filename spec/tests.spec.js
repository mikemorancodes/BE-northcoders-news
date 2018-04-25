process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const { topicData, articleData, userData } = require("../seed/testData");

describe("/api", function() {
  this.timeout(10000);
  beforeEach(() => {
    return seedDB(topicData, articleData, userData);
  });
  after(() => mongoose.disconnect());
  describe("/topics", () => {
    it("get /topics returns status 200 and all the topics", () => {
      return request
        .get(`/api/topics`)
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).to.equal(2);
        });
    });
  });
});

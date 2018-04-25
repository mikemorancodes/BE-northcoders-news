process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const { topicData, articleData, userData } = require("../seed/testData");

describe("/", () => {
  beforeEach(() => {
    return seedDB(topicData, articleData, userData);
  });
  after(() => mongoose.disconnect());
  describe("/api", () => {
    it("get /actors returns status 200 and all the actors", () => {
      return request
        .get(`/api/actors`)
        .expect(200)
        .then(({ body }) => {
          expect(body.actors.length).to.equal(8);
          expect(body.actors[0].name).to.equal("Amy Adams");
          expect(body.actors[3]._id).to.be.a("string");
        });
    });
  });
});

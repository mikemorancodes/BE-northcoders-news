module.exports = {
  GET: {
    "/api/topics": "Get all topics.",
    "/api/topics/:topic_id/articles": "Get all the articles for a certain topic",
    "/api/articles": "Get all the articles.",
    "/api/articles/:article_id": "Get an individual article.",
    "/api/articles/:article_id/comments": "Get all the comments for a individual article.",
    "/api/users/:username": "Get user by username."
  },
  POST: {
    "/api/topics/:topic_id/articles": "Add a new article to a topic.",
    "/api/articles/:article_id/comments": "Add a new comment to an article."
  },
  PUT: {
    "/api/articles/:article_id": "Increment or Decrement the votes of an article by one.",
    "/api/comments/:comment_id": "Increment or Decrement the votes of a comment by one."
  },
  DELETE: {
    "/api/comments/:comment_id": "Delete comment"
  }
};

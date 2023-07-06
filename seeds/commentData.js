const { Comment } = require("../models");

const commentdata = [
  {
    comment_text: "Don't like this JS feature",
    post_id: 1,
    user_id: 2,
  },
  {
    comment_text: "I like this HTML feature",
    post_id: 2,
    user_id: 1,
  },
  {
    comment_text: "I like this CSS feature",
    post_id: 3,
    user_id: 2,
  },
  {
    comment_text: "Word!",
    post_id: 3,
    user_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;


const { Post } = require("../models");

const postdata = [
  {
    post_title: "New JS feature",
    post_text: "Amazing new feature in JS!",
    user_id: 1,
  },
  {
    post_title: "New HTML feature",
    post_text: "Amazing new feature in HTML!",
    user_id: 2,
  },
  {
    post_title: "New CSS feature",
    post_text: "Amazing new feature in CSS!",
    user_id: 1,
  },
  {
    post_title: "New JS feature in Express.js",
    post_text: "Amazing new feature in Express.js!",
    user_id: 3,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;

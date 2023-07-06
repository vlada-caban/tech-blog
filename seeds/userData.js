const { User } = require("../models");

const userData = [
  {
    username: "Vlada",
    email: "vlada@gmail.com",
    password: "password123",
  },
  {
    username: "Tom",
    email: "tom@gmail.com",
    password: "password345",
  },
  {
    username: "Jess",
    email: "jess@aol.com",
    password: "password456",
  },
];

const seedUser = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUser;

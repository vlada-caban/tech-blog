const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          model: User,
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get("/post/:id", async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, allow them to view full post
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: Comment }, { model: User }],
      });
      const post = postData.get({ plain: true });
      // console.log(post);
      console.log(req.session.cookie);
      res.render("onepost", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.post("/comment", async (req, res) => {
  // add a new comment
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/post", async (req, res) => {
  // add a new post
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const userID = req.session.user_id;
      const postData = await Post.findAll({
        where: {
          user_id: userID,
        },
        include: [
          {
            model: Comment,
            model: User,
          },
        ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      // console.log(posts);
      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    return;
  }
  res.render("login");
});

router.get("/newpost", (req, res) => {
  // res.render("newpost"), { loggedIn: req.session.loggedIn };
  if (req.session.loggedIn) {
    res.render("newpost", { loggedIn: req.session.loggedIn });
    return;
  }
  res.render("login");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;

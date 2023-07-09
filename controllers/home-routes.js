const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      // TODO: organize in descending order
      // order: ["createdAt", "DESC"],
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
      // console.log(req.session.cookie);
      res.render("onepost", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// UPDATE one post
router.put("/post/:id", async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, update post in database
    try {
      const post_title = req.body.post_title;
      const post_text = req.body.post_body;

      const postData = await Post.update(
        { post_title, post_text },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


// GET one post to edit
router.get("/post/edit/:id", async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, allow them to edit post
    try {
      const userID = req.session.user_id;
      const postData = await Post.findByPk(req.params.id, {
        where: {
          user_id: userID,
        },
        include: [{ model: Comment }, { model: User }],
      });
      const post = postData.get({ plain: true });
      // console.log(post);
      // console.log(req.session.cookie);
      res.render("editpost", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.post("/comment", async (req, res) => {
  // add a new comment
  try {
    const comment_text = req.body.comment_text;
    const post_id = req.body.post_id;
    const user_id = req.session.user_id;
    const commentData = await Comment.create({
      comment_text,
      post_id,
      user_id
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/post", async (req, res) => {
  // add a new post
  try {
    const post_title = req.body.post_title;
    const post_text = req.body.post_body;
    const user_id = req.session.user_id;
    const postData = await Post.create({
      post_title,
      post_text,
      user_id
    });
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
  if (req.session.loggedIn) {
    res.render("newpost", { loggedIn: req.session.loggedIn });
    return;
  }
  res.render("login");
});

router.delete("/post/:id", async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;

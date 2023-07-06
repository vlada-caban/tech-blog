const router = require('express').Router();
const { Post, Comment } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  // try {
  //   const postsData = await Post.findAll({
  //     include: [
  //       {
  //         model: Comment,
  //       },
  //     ],
  //   });

  //   const posts = postData.map((post) =>
  //     post.get({ plain: true })
  //   );

  //   res.render('homepage', {
  //     posts,
  //     loggedIn: req.session.loggedIn,
  //   });

  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }

  res.render('homepage', {loggedIn: req.session.loggedIn})
});

// GET one post
router.get('/post/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view full post
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
          },
        ],
      });
      const post = postData.get({ plain: true });
      res.render('onepost', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;

// Imports
const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to display all blog posts on the homepage
router.get("/", async (req, res) => {
  try {
    // Retrieve all blog posts, including associated user and comment data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],   // Include only the 'name' attribute of the User model
        },
        {
          model: Comment,
          attributes: ["comment_body"],   // Include only the 'comment_body' attribute of the Comment model
        },
      ],
    });

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    // Render the homepage template with serialized data and session flag
    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Log and respond with a server error status and the error details as JSON
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to display a single blog post and associated comments
router.get("/blogPost/:id", withAuth, async (req, res) => {
  try {
    // Retrieve a specific blog post by ID, including associated user and comment data
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    // Serialize data for template rendering
    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost);

     // Render the blogPost template with serialized data and session flag
    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Log and respond with a server error status and the error details as JSON
    res.status(500).json(err);
    // Redirect to login if there is an error or the user is not authenticated
    res.redirect("/login");
  }
});

// Route to display the user dashboard with their blog posts and comments
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Retrieve user data based on the session ID, excluding the password
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // Include user's blog posts and comments
      include: [
        {
          model: BlogPost,
          include: [User],
        },
        {
          model: Comment,
        },
      ],
    });

    // Serialize data for template rendering
    const user = userData.get({ plain: true });
    console.log(user)

    // Render the dashboard template with serialized data and session flag
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    // Log and respond with a server error status and the error details as JSON
    res.status(500).json(err);
  }
});

// NEW POST PAGE: Renders 'create.handlebars'; redirects to /login if not logged in
router.get("/create", async (req, res) => {
  try {
    // Check if the user is logged in; if yes, render the 'create' page, otherwise redirect to login
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    // Log and respond with a server error status and the error details as JSON
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the 'edit' page for an existing blog post
router.get("/create/:id", async (req, res) => {
  try {
     // Retrieve a specific blog post by ID, including associated user and comment data
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    // Serialize data for template rendering
    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost);

    // Check if the user is logged in; if yes, render the 'edit' page, otherwise redirect to login
    if (req.session.logged_in) {
      res.render("edit", {
        ...blogPost,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    // Log and respond with a server error status and the error details as JSON
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the 'login' page
router.all("/login", (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  // Render the 'login' page
  res.render("login");
});
//==========================================================
router.get("/signup", async (req, res) => {
  res.render("signup");
})

// Export
module.exports = router;
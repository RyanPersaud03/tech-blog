// Imports
const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new blog post
router.post("/", withAuth, async (req, res) => {
  // Log the request body to the console for debugging
  console.log(req.body);
  try {
    // Create a new blog post using the BlogPost model and user's session ID
    const newBlogPost = await BlogPost.create({
      ...req.body,            // Spread operator to include all properties from the request body
      user_id: req.session.user_id,   // Assign the user's session ID to the 'user_id' field
    });

     // Respond with a success status and the newly created blog post as JSON
    res.status(200).json(newBlogPost);
  } catch (err) {
    // Log any errors to the console for debugging
    console.log(err)
    // Respond with an error status and the error details as JSON
    res.status(400).json(err);
  }
});

// Route to edit an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  // Log the request body to the console for debugging
  console.log(req.body);
  try {
    // Update the blog post with the given ID using the data from the request body
    const blogPostData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,    // Find the blog post with the specified ID
      },
    });

    // Check if a blog post with the given ID was found and updated
    if (!blogPostData) {
       // Respond with a 404 status and an error message if no blog post is found
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    // Respond with a success status and the updated blog post data as JSON
    res.status(200).json(blogPostData);
  } catch (err) {
    // Respond with a server error status and the error details as JSON
    res.status(500).json(err);
  }
});

// Route to delete an existing blog post
router.delete("/:id", withAuth, async (req, res) => {
  // Log the blog post ID to the console for debugging
  console.log(req.params.id);
  try {
    // Delete the blog post with the given ID
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,  // Find the blog post with the specified ID
      },
    });

     // Check if a blog post with the given ID was found and deleted
    if (!blogPostData) {
      // Respond with a not found status and an error message if no blog post is found
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    // Respond with a success status and the deleted blog post data as JSON
    res.status(200).json(blogPostData);
  } catch (err) {
    // Respond with a server error status and the error details as JSON
    res.status(500).json(err);
  }
});

// Exports
module.exports = router;
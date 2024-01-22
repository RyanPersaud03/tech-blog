// Imports
const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");

// CREATE Comment
router.post("/", async (req, res) => {
  try {
    console.log("success");

    // Create a new comment using the Comment model and provided data
    const comment = await Comment.create({
      comment_body: req.body.comment_body,                // Extract comment body from request body
      blogPost_id: req.body.blogPost_id,                  // Extract blog post ID from request body
      user_id: req.session.user_id || req.body.user_id,   // Use the session user ID or provided user ID
    });

    // Respond with a success status and the newly created comment as JSON
    res.status(200).json(comment);
  } catch (err) {
    // Log and respond with a server error status and the error details as JSON
    console.error(err);
    res.status(500).json(err);
  }
});

// READ all Comments
router.get("/", async (req, res) => {
  try {
    // Retrieve all comments, including associated user and blog post data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"], // Include only the 'username' attribute of the User model
        },
        {
          model: BlogPost,
          attributes: ["id"],       // Include only the 'id' attribute of the BlogPost model
        },
      ],
    });

    // Respond with a success status and the retrieved comment data as JSON
    res.status(200).json(commentData);
  } catch (err) {
    // Respond with a server error status and the error details as JSON
    res.status(500).json(err);
  }
});

// UPDATE Comment
router.put("/:id", async (req, res) => {
  try {
    // Update the comment with the specified ID using data from the request body
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,  // Find the comment with the specified ID
      },
    });

    // Check if a comment with the specified ID was found and updated
    if (!updatedComment[0]) {
       // Respond with a bad request status and an error message if no comment is found
      res.status(400).json({ message: "No comment found with that id!" });
      return;
    }

    // Log a success message and respond with a success status and the updated comment data as JSON
    console.log("Comment updated!");
    res.status(200).json(updatedComment);
  } catch (err) {
    // Log and respond with a server error status and the error details as JSON
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE Comment
router.delete("/:id", async (req, res) => {
  try {
    // Delete the comment with the specified ID
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,  // Find the comment with the specified ID
      },
    });

    // Check if a comment with the specified ID was found and deleted
    if (!comment) {
      // Respond with a not found status and an error message if no comment is found
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    // Respond with a success status and the deleted comment data as JSON
    res.status(200).json(comment);
  } catch (err) {
    // Respond with a server error status and the error details as JSON
    res.status(500).json(err);
  }
});

// Exports
module.exports = router;
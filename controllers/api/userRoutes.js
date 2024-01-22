// Imports
const router = require("express").Router();
const { User } = require("../../models");

// Route to create a new user by posting email, username, and password to the database
router.post("/", async (req, res) => {
  try {
    // Create a new user using the User model and data from the request body
    const userData = await User.create(req.body);

    // Save user information in the session and respond with a success status and user data as JSON
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    // Respond with a bad request status and the error details as JSON in case of an error
    res.status(400).json(err);
  }
});

// Route to log in an existing user by validating user credentials and setting up the session
router.post("/login", async (req, res) => {
  try {
    // Find a user by their email in the database
    const userData = await User.findOne({ where: { email: req.body.email } });

    // Check if a user with the provided email exists
    if (!userData) {
      console.log("no user found");
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Check if the provided password matches the user's stored password
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is not valid, respond with an error message
    if (!validPassword) {
      console.log("no password match");
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Save user information in the session and respond with a success status and user data as JSON
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    // Respond with a bad request status and the error details as JSON in case of an error
    res.status(400).json(err);
  }
});

// Route to log out the user by ending the session
router.post("/logout", (req, res) => {
  // Check if the user is logged in
  if (req.session.logged_in) {
    // Destroy the session and respond with a no content status
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, respond with a not found status
    res.status(404).end();
  }
});

// Exports
module.exports = router;
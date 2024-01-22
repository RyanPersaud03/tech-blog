// Imports
const router = require("express").Router();

// Import routes for different entities
const userRoutes = require("./userRoutes");         // User-related routes
const blogPostRoutes = require("./blogPostRoutes"); // Blog post-related routes
const commentRoutes = require("./commentRoutes");   // Comment-related routes

// Middleware
router.use("/users", userRoutes);              // Use userRoutes for paths starting with '/users'
router.use("/blogPost", blogPostRoutes);       // Use blogPostRoutes for paths starting with '/blogPost'
router.use("/comment", commentRoutes);         // Use commentRoutes for paths starting with '/comment'

// Exports
module.exports = router;
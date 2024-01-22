// Imports
const router = require("express").Router();

// Import routes for API and homepage
const apiRoutes = require("./api");             // Routes for API endpoints
const homeRoutes = require("./homeRoutes");     // Routes for homepage

// Middleware
router.use("/", homeRoutes);        // Use homeRoutes for paths starting with '/'
router.use("/api", apiRoutes);      // Use apiRoutes for paths starting with '/api'

// Exports
module.exports = router;
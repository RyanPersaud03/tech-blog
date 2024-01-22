// Import the Sequelize library for interacting with databases
const Sequelize = require('sequelize');

// Load environment variables from the .env file
require('dotenv').config();

// Declare a variable to hold the Sequelize instance
let sequelize;

// Check if a JAWSDB_URL environment variable is present (indicating a production environment)
if (process.env.JAWSDB_URL) {
     // If JAWSDB_URL is present, create a Sequelize instance using the provided database URL
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
     // If JAWSDB_URL is not present, create a Sequelize instance using local database configuration
    sequelize = new Sequelize(
        process.env.DB_NAME,        // Database name
        process.env.DB_USER,        // Database user
        process.env.DB_PASSWORD,    // Database password
        {
            host: 'localhost',      // Database host (local)
            dialect: 'mysql',       // Database dialect (MySQL in this case)
            port: 3306              // Database port
        }
    );
}

// Export the configured Sequelize instance to be used in other parts of the application
module.exports = sequelize;
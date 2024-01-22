// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the Comment model by extending the Sequelize Model class
class Comment extends Model {}

// Comment Table Model
Comment.init(
  {
     // Define columns for the Comment table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",    // Reference the 'user' model
        key: "id",        // Reference the 'id' column in the 'user' model
      },
    },
    blogPost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogPost",    // Reference the 'blogPost' model
        key: "id",            // Reference the 'id' column in the 'blogPost' model
      },
    },
  },
  {
    sequelize,                // Use the configured Sequelize instance
    timestamps: false,        // Disable timestamps (createdAt, updatedAt) for this model
    freezeTableName: true,    // Use the model's name as the table name without pluralizing
    underscored: true,        // Use underscores (_) instead of camelCase in column names
    modelName: "comment",     // Set the model name for associations and queries
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
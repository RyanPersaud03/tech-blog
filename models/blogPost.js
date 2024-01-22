// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the BlogPost model by extending the Sequelize Model class
class BlogPost extends Model {}

// BlogPost Table Model
BlogPost.init(
  {
    // Define columns for the BlogPost table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",     // Reference the 'user' model
        key: "id",         // Reference the 'id' column in the 'user' model
      },
    },
  },
  {
    sequelize,              // Use the configured Sequelize instance
    timestamps: false,      // Disable timestamps (createdAt, updatedAt) for this model
    freezeTableName: true,  // Use the model's name as the table name without pluralizing
    underscored: true,      // Use underscores (_) instead of camelCase in column names
    modelName: "blogPost",  // Set the model name for associations and queries
  }
);

// Export the BlogPost model for use in other parts of the application
module.exports = BlogPost;
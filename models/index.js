// Imports
const User = require("./usermodel");
const BlogPost = require("./blogPost");
const Comment = require("./comment");

// Sets up relationships between tables and allows joining them using Sequelize
// User has many BlogPosts, establishing a one-to-many relationship
User.hasMany(BlogPost, {
  foreignKey: "user_id",    // The foreign key in the BlogPost table referencing the User table
  onDelete: "CASCADE",      // When a User is deleted, also delete their associated BlogPosts
});

// BlogPost belongs to a User, establishing the reverse relationship
BlogPost.belongsTo(User, {
  foreignKey: "user_id",      // The foreign key in the BlogPost table referencing the User table
});

// User has many Comments, establishing another one-to-many relationship
User.hasMany(Comment, {
  foreignKey: "user_id",    // The foreign key in the Comment table referencing the User table
  onDelete: "CASCADE",      // When a User is deleted, also delete their associated Comments
});

// Comment belongs to a User, establishing the reverse relationship
Comment.belongsTo(User, {
  foreignKey: "user_id",      // The foreign key in the Comment table referencing the User table
});

// Comment belongs to a BlogPost, establishing a relationship between Comment and BlogPost
Comment.belongsTo(BlogPost, {
  foreignKey: "blogPost_id",    // The foreign key in the Comment table referencing the BlogPost table
  onDelete: "CASCADE",          // When a BlogPost is deleted, also delete its associated Comments
});

// BlogPost has many Comments, establishing the reverse relationship
BlogPost.hasMany(Comment, {
  foreignKey: "blogPost_id",    // The foreign key in the Comment table referencing the BlogPost table
  onDelete: "CASCADE",          // When a BlogPost is deleted, also delete its associated Comments
});

// Export the models for use in other parts of the application
module.exports = { User, BlogPost, Comment };
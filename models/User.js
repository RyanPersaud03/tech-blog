// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Define the User model by extending the Sequelize Model class
class User extends Model {
  // Method to check if the entered password matches the hashed password stored in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// User Table Model
User.init(
  {
    // Define columns for the User table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,             // Ensure email addresses are unique in the database
      validate: {
        isEmail: true,          // Validate that the email column follows the email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],               // Validate that the password is at least 8 characters long
      },
    },
  },
  {
    // Hooks to hash passwords before creating or updating user data
    hooks: {
      // Hook before creating a new user to hash the password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hook before updating user data to hash the password
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,              // Use the configured Sequelize instance
    timestamps: false,      // Disable timestamps (createdAt, updatedAt) for this model
    freezeTableName: true,  // Use the model's name as the table name without pluralizing
    underscored: true,      // Use underscores (_) instead of camelCase in column names
    modelName: "user",      // Set the model name for associations and queries
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
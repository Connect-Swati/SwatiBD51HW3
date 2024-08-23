/*
Creating Models

Create a folder named models and create a file inside this folder named book.model.js

Import the sequelize instance & DataTypes from the /lib/index.js file

Define a model named book with the columns title as TEXT, author as TEXT, description as TEXT, genre as TEXT

Export the model from the file
*/

const { sequelize_instance, DataTypes } = require("../lib/index");
// Defines a model representing the 'book ' table with its structure
const book = sequelize_instance.define("book ", {
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  description: DataTypes.TEXT,
  genre: DataTypes.TEXT,
});
// Makes the book model available elsewhere in the application
module.exports = book;

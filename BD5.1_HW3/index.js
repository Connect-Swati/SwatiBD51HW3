/*
Packages are installed using the command:

npm install express sequelize sqlite3 // or by adding dependencies directly from dependencies tab
*/

/*
Seeding the database with data

Create an express server with an endpoint /seed_db which will seed the database with dummy data

Declare a variable named books which will contain an array of objects with dummy books.

Populate the variable books with dummy books data

Use the model books and bulkCreate method to seed dummy data into the database file whenever the user visits the /seed_db endpoint.
*/

/*
Packages are installed using the command:

npm install express sequelize sqlite3 // or by adding dependencies directly from dependencies tab
*/
let express = require("express");
let app = express();
let port = 3000;
// Import the book model and Sequelize instance from the previously defined paths
let book = require("./models/book.model");
let { sequelize_instance } = require("./lib/index");

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD5.1 - HW3" });
});

let books = [
  {
    title: "The Guide",
    author: "R.K. Narayan",
    description:
      "A captivating novel about a tour guide who transforms into a spiritual guide and then one of the greatest holy men of India.",
    genre: "Fiction",
  },
  {
    title: "Midnight's Children",
    author: "Salman Rushdie",
    description:
      "This novel deals with India's transition from British colonialism to independence and the partition of India. It is considered an example of postcolonial, postmodern, and magical realist literature.",
    genre: "Historical Fiction",
  },
  {
    title: "The God of Small Things",
    author: "Arundhati Roy",
    description:
      "The story explores how the small things affect people's behavior and their lives. It won the Booker Prize in 1997 and is a poignant depiction of the caste system in India.",
    genre: "Literary Fiction",
  },
  {
    title: "The White Tiger",
    author: "Aravind Adiga",
    description:
      "This novel provides a darkly humorous perspective of India’s class struggle in a globalized world as told through a retrospective narration from Balram Halwai, a village boy.",
    genre: "Fiction",
  },
  {
    title: "Train to Pakistan",
    author: "Khushwant Singh",
    description:
      "This historical novel recounts the Partition of India in 1947 through the perspective of a small village in Punjab that is suddenly thrown into the sectarian violence.",
    genre: "Historical Fiction",
  },
  {
    title: "Malgudi Days",
    author: "R.K. Narayan",
    description:
      "A collection of short stories set in the fictional town of Malgudi, these stories are imbued with warmth and humor that Narayan is best known for.",
    genre: "Fiction",
  },
  {
    title: "A Suitable Boy",
    author: "Vikram Seth",
    description:
      "A modern classic about the story of four families and the widowed mother's efforts to find a suitable boy for her daughter during the post-partition era.",
    genre: "Epic Fiction",
  },
];

// end point to see the db
app.get("/seed_db", async (req, res) => {
  try {
    // Synchronize the database, forcing it to recreate the tables if they already exist

    await sequelize_instance.sync({ force: true });
    // Bulk create entries in the book table using predefined data

    // self study
    /*
    capture the result of the bulkCreate method, which returns an array of the created instances
    */

    let insertedBooks = await book.bulkCreate(books);
    // Send a 200 HTTP status code and a success message if the database is seeded successfully
    res
      .status(200)
      .json({
        message: "Database Seeding successful",
        recordsInserted: insertedBooks.length,
      }); // Displays the number of books inserted
  } catch (error) {
    // Send a 500 HTTP status code and an error message if there's an error during seeding

    console.log("Error in seeding db", error.message);
    return res.status(500).json({
      code: 500,
      message: "Error in seeding db",
      error: error.message,
    });
  }
});

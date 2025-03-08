require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.TEST_MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
    process.exit(1);
  });

const Note = require("./models/note");

const n1 = new Note({
  content: "HTML is easy",
});

const n2 = new Note({
  content: "Browser can execute only Javascript",
});

Note.insertMany([n1, n2]).then(() => {
  console.log("notes saved!");
  mongoose.connection.close();
});

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log("too many arguments !!!");
  process.exit(1);
}
const mongoose = require("mongoose");

const PASSWORD = process.argv[2];

const MONGODB_URI = `mongodb+srv://root:${PASSWORD}@cluster0.owk91.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(MONGODB_URI).catch((error) => {
  console.log("error connecting to MongoDB:", error.message);
  process.exit(1);
});

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Contact.find()
    .then((result) => {
      result.forEach((contact) => {
        console.log(`${contact.name} ${contact.number}`);
      });
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact
    .save()
    .then(() => {
      console.log(
        `added ${contact.name}'s number ${contact.number} to phonebook`
      );
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

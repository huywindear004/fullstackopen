const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const DB_URI = process.env.MONGODB_URI;

console.log("Connecting to", DB_URI);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      minLength: 8,
      required: true,
      validate: {
        validator: (v) => {
          return /^\d{2,3}-\d+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

module.exports = mongoose.model("Contact", contactSchema);

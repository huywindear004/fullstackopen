const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema(
  {
    content: String,
    important: Boolean,
  },
  {
    methods: {
      do_nutin: function () {
        console.log(this._id + ": " + this.content);
      },
    },
  },
  {
    statics: {
      findByContent: function (content) {
        return this.find({ content: content });
      },
    },
  }
);

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

Note.find().then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

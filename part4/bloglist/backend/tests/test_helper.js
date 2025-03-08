const Blog = require("../models/blog");

const initBlogs = [
  {
    title: "Understanding Mongoose",
    author: "John Doe",
    url: "https://example.com/mongoose-guide",
    likes: 120,
  },
  {
    title: "Mastering Node.js",
    author: "Jane Smith",
    url: "https://example.com/nodejs-tips",
    likes: 95,
  },
  {
    title: "10 Tips for Writing Clean JavaScript",
    author: "Alice Johnson",
    url: "https://example.com/clean-js",
    likes: 200,
  },
  {
    title: "Introduction to MongoDB",
    author: "Bob Williams",
    url: "https://example.com/mongodb-intro",
    likes: 175,
  },
];

const getBlogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initBlogs,
  getBlogsInDB,
};

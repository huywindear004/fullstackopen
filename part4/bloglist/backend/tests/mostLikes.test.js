const { test, describe } = require("node:test");
const assert = require("node:assert");
const mostLikes = require("../utils/list_helper").mostLikes;

describe("Author has the most likes", () => {
  const listWithNoBlogs = [];
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];
  const listWithManyBlogs = [
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
    {
      title: "Introduction to MongoDB 2",
      author: "Bob Williams",
      url: "https://example.com/mongodb-intro",
      likes: 50,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of empty list is zero", () => {
    const result = mostLikes(listWithNoBlogs);
    assert.strictEqual(result, null);
  });

  test("of a bigger list is calculated right", () => {
    const result = mostLikes(listWithManyBlogs);
    assert.deepStrictEqual(result, {
      author: "Bob Williams",
      likes: 225,
    });
  });
});

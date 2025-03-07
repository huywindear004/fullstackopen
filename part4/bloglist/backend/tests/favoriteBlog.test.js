const { test, describe } = require("node:test");
const assert = require("node:assert");
const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favorite blog", () => {
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
  ];

  test("when list has no blog equals to null", () => {
    const result = favoriteBlog(listWithNoBlogs);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog, equals the blog", () => {
    const result = favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = favoriteBlog(listWithManyBlogs);
    assert.deepStrictEqual(result, {
      title: "10 Tips for Writing Clean JavaScript",
      author: "Alice Johnson",
      url: "https://example.com/clean-js",
      likes: 200,
    });
  });
});

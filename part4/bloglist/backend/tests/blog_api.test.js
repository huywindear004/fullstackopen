const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const promiseArr = helper.initBlogs.map((blog) => new Blog(blog).save());
  await Promise.all(promiseArr);
});

test("4.8. blogs are returned as json and there are four blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const blogs = response.body;
  assert.strictEqual(blogs.length, helper.initBlogs.length);
});

test("4.9. identifier property of the blog posts is named id", async () => {
  const blog = (await helper.getBlogsInDB())[0];
  assert(blog.hasOwnProperty("id"));
  assert(!blog.hasOwnProperty("_id"), "id property should not be _id");
});

test("4.10. Create a new blog post successfully", async () => {
  const validBlog = {
    title: "The Future of JavaScript Frameworks",
    author: "Henry Clark",
    url: "https://example.com/js-frameworks-future",
    likes: 150,
  };

  await api
    .post("/api/blogs")
    .send(validBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.getBlogsInDB();
  assert.strictEqual(blogs.length, helper.initBlogs.length + 1);
  const titles = blogs.map((blog) => blog.title);
  assert(titles.includes(validBlog.title));
});

test("4.11. If likes property is missing, it will default to 0", async () => {
  const blogWithoutLikes = {
    title: "Krrrrrr",
    author: "Huy dep trai",
    url: "deo co link",
  };
  const response = await api
    .post("/api/blogs")
    .send(blogWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.getBlogsInDB();
  assert.strictEqual(blogsAtEnd.length, helper.initBlogs.length + 1);
  const newBlog = blogsAtEnd.find((blog) => blog.id === response.body.id);
  assert.strictEqual(newBlog.likes, 0);
});

test("4.12. If title or url property is missing, return 400 Bad Request", async () => {
  const blogWithoutTitle = {
    author: "Huy dep trai",
    url: "deo co link",
  };

  await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
});

after(async () => {
  await mongoose.connection.close();
});

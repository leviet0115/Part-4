const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const intialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blog = new Blog(intialBlogs[0]);
  await blog.save();

  blog = new Blog(intialBlogs[1]);
  await blog.save();

  blog = new Blog(intialBlogs[2]);
  await blog.save();
});

//4.8
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//4.9
test("blogs' unique identifier is named id", async () => {
  const res = await api.get("/api/blogs");
  res.body.forEach((blog) => expect(blog.id).toBeDefined());
});

//4.10
test("a new blog is successfully created with POST", async () => {
  const newBlog = {
    title: "blog1",
    author: "David Lee",
    url: "blogs.com/blog1",
    likes: 120,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(intialBlogs.length + 1);

  const lastBlog = res.body[res.body.length - 1];
  expect(lastBlog.title).toBe("blog1");
  expect(lastBlog.author).toBe("David Lee");
  expect(lastBlog.url).toBe("blogs.com/blog1");
  expect(lastBlog.likes).toBe(120);
});

//4.11 Write a test that verifies that if the likes property is missing from the request
test("if likes is missing, save likes as 0", async () => {
  const newBlog = {
    title: "blog1",
    author: "David Lee",
    url: "blogs.com/blog1",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");
  const lastBlog = res.body[res.body.length - 1];
  expect(lastBlog.likes).toBe(0);
});

//4.12
test("400 response status if title and url are missing", async () => {
  const newBlogs = [
    {
      title: "blog1",
      author: "David Lee",
      likes: 123,
    },

    {
      author: "Leny Dawn",
      url: "blogs.com/blog2",
      likes: 135034,
    },
  ];

  const promises = newBlogs.map((blog) =>
    api.post("/api/blogs").send(blog).expect(400)
  );

  await Promise.all(promises);
});

afterAll(() => {
  mongoose.connection.close();
});

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const { blogsInDB, nonExistedId } = require("../utils/test_helper");

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

  const blogObjects = intialBlogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((object) => object.save());
  await Promise.all(promises);
});

describe("when viewing blogs", () => {
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
});

describe("when saving a new blog", () => {
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

    const existedBlogs = await blogsInDB();
    expect(existedBlogs).toHaveLength(intialBlogs.length + 1);

    const lastBlog = existedBlogs[existedBlogs.length - 1];
    expect(lastBlog.title).toBe("blog1");
    expect(lastBlog.author).toBe("David Lee");
    expect(lastBlog.url).toBe("blogs.com/blog1");
    expect(lastBlog.likes).toBe(120);
  });

  //4.11
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
  test("returns 400 if title and url are missing", async () => {
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
});

describe("when deleting a blog", () => {
  //existed id
  test("return 204 if id exists", async () => {
    const beforeDelete = await blogsInDB();
    const blogToDelete = beforeDelete[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const afterDelete = await blogsInDB();
    expect(afterDelete).not.toContainEqual(blogToDelete);
  });

  //non-existed id
  test("return 404 if id doesn't exist", async () => {
    const id = await nonExistedId();
    //console.log(id);
    await api.delete(`/api/blogs/${id}`).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

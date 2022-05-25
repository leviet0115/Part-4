const Blog = require("../models/blog");

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistedId = async () => {
  const blog = new Blog({
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

module.exports = { blogsInDB, nonExistedId };

const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate("user")
    .catch((error) => next(error));
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, likes, url } = request.body;
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log("decoded!");
    if (!decodedToken.id) {
      return response.status(401).json("Token is missing or invalid.");
    }
    const user = await User.findById(decodedToken.id);
    console.log("found users in DB!", user);

    const blog = new Blog({ title, author, likes, url, user: user._id });

    const savedBlog = await blog.save();
    console.log("blog added to database");

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    console.log("user blog list updated");

    return response.status(201).json(savedBlog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    //console.log(request.params.id);
    const res = await Blog.findByIdAndRemove(request.params.id);
    //console.log(res);
    if (res) return response.send(204).end();
    return response.send(404).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;

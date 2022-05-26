const blogRouter = require("express").Router();
const { next } = require("../utils/error_helper");
const blog = require("../models/blog");
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    //console.log(request.params.id);
    const res = await blog.findByIdAndRemove(request.params.id);
    //console.log(res);
    if (res) return response.send(204).end();
    return response.send(404).end();
  } catch (error) {
    (error) => next(error);
  }
});

module.exports = blogRouter;

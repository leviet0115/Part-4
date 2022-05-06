const lodash = require("lodash");

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 };

  const blogsByAuthor = lodash
    .chain(blogs)
    .groupBy((blog) => blog.author)
    .mapValues((blogs) => blogs.length)
    .value();
  const numberOfBlogs = Object.values(blogsByAuthor);
  const max = numberOfBlogs.reduce((a, b) => Math.max(a, b), -Infinity);
  const mostBlogsAuthor = lodash.findKey(
    blogsByAuthor,
    (author) => author === max
  );

  const mostBlogs = {
    author: mostBlogsAuthor,
    blogs: max,
  };

  return mostBlogs;
};

module.exports = mostBlogs;

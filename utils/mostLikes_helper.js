const lodash = require("lodash");

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  if (blogs.length === 1)
    return { author: blogs[0].author, likes: blogs[0].likes };

  const likesByAuthor = lodash
    .chain(blogs)
    .groupBy((blog) => blog.author)
    .mapValues((blogs) => blogs.reduce((total, blog) => total + blog.likes, 0))
    .value();

  const numberOfLikes = Object.values(likesByAuthor);
  const max = numberOfLikes.reduce((a, b) => Math.max(a, b), -Infinity);
  const mostLikesAuthor = lodash.findKey(
    likesByAuthor,
    (author) => author === max
  );

  const mostLikes = {
    author: mostLikesAuthor,
    likes: max,
  };

  return mostLikes;
};

module.exports = mostLikes;

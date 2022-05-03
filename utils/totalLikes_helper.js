const totalLikes = (blogs) => {
  const reducer = (total, blog) => total + blog.likes;
  return blogs.reduce(reducer, 0);
};

module.exports = totalLikes;

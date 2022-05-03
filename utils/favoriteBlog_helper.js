const favoriteBlog = (blogs) => {
  const firstBlogOf = (blogs) => ({
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes,
  });

  if (blogs.length === 0) return {};

  if (blogs.length === 1) return firstBlogOf(blogs);

  const likes = blogs.map((blog) => blog.likes);

  const mostLikes = likes.reduce((a, b) => Math.max(a, b), -Infinity);

  const favBlogs = blogs.filter((blog) => blog.likes === mostLikes);

  return firstBlogOf(favBlogs);
};

module.exports = favoriteBlog;

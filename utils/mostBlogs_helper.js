const lodash = require("lodash");
const { blogs } = require("../tests/testingData");

const mostBlogs = (blogs) => {
  const blogsByAuthor = lodash
    .chain(blogs)
    .groupBy((blog) => blog.author)
    .mapKeys()
    .values();
  console.log(blogsByAuthor);
};

mostBlogs(blogs);

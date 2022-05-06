const mostBlogs = require("../utils/mostBlogs_helper");
const { listWithOneBlog, blogs } = require("./testingData");

describe("Author with the most blogs", () => {
  test("of an empty list", () => {
    expect(mostBlogs([])).toEqual({});
  });

  test("of a list with one blog", () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a long blog list", () => {
    expect(mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

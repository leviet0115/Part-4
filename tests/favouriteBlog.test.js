const favouriteBlog = require("../utils/favoriteBlog_helper");
const { listWithOneBlog, blogs } = require("./testingData");

describe("Favourite Blog", () => {
  test("of an empty list should be {}", () => {
    expect(favouriteBlog([])).toEqual({});
  });

  test("of a list with one blog should be that blog", () => {
    expect(favouriteBlog(listWithOneBlog)).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a list should be the blog with the most likes", () => {
    expect(favouriteBlog(blogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

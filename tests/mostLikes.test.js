const mostLikes = require("../utils/mostLikes_helper");
const { listWithOneBlog, blogs } = require("./testingData");

describe("Author with the most likes", () => {
  test("of an empty list", () => {
    expect(mostLikes([])).toEqual({});
  });

  test("of a list with one blog", () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a long blog list", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

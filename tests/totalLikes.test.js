const totalLikes = require("../utils/totalLikes_helper");
const { listWithOneBlog, blogs } = require("./testingData");

describe("total likes", () => {
  test("of an empty list shoudld be 0", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("of a list with one blog should be equal to the number of likes of that blog", () => {
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });

  test("of a list of blogs should be the correct sum", () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});

const supertest = require("supertest");
const app = require("../app.js");
const api = supertest(app);
const mongoose = require("mongoose");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  const userInDB = await User.find({});
  expect(userInDB.length).toBe(0);
});

describe("When adding an invalid user", () => {
  //test case 1: no password
  test("With no password", async () => {
    const invalidUser = {
      username: "popo",
      name: "polina",
    };
    const response = await api.post("/api/users").send(invalidUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Password is missing.");

    const userInDBAfterward = await User.find({
      username: invalidUser.username,
    });
    expect(userInDBAfterward.length).toBe(0);
  });

  //test case 2: no username
  test("With no password", async () => {
    const invalidUser = {
      name: "polina",
      password: "120943",
    };
    const response = await api.post("/api/users").send(invalidUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(
      "User validation failed: username: Path `username` is required."
    );

    const userInDBAfterward = await User.find({
      name: invalidUser.name,
    });
    expect(userInDBAfterward.length).toBe(0);
  });

  //test case 3: password with fewer than 3 characters
  test("With password shorter than 3 characters", async () => {
    const invalidUser = {
      username: "popo",
      password: "po",
    };
    const response = await api.post("/api/users").send(invalidUser);
    expect(response.statusCode).toBe(400);
    console.log(response.body);
    expect(response.body.error).toEqual("The minimum length of password is 3.");

    const userInDBAfterward = await User.find({
      name: invalidUser.name,
    });
    expect(userInDBAfterward.length).toBe(0);
  });

  //test case 4: username with fewer than 3 characters
  test("With username shorter than 3 characters", async () => {
    const invalidUser = {
      username: "po",
      password: "popo091094354",
    };
    const response = await api.post("/api/users").send(invalidUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual(
      "User validation failed: username: Path `username` (`po`) is shorter than the minimum allowed length (3)."
    );

    const userInDBAfterward = await User.find({
      name: invalidUser.name,
    });
    expect(userInDBAfterward.length).toBe(0);
  });
});

afterAll(() => mongoose.connection.close());

const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const { setUpDatabase, userOne, userOneId } = require("./fixtures/db");

beforeEach(setUpDatabase);
test("Should signup a new user", async () => {
  //   jest.setTimeout(10000);
  const response = await request(app)
    .post("/users/")
    .send({
      name: "geek",
      email: "ttke@gmail.com",
      password: "piyush",
    })
    .expect(201);
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: "geek",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("piyush");
});

test("Should login existing user", async () => {
  //   jest.setTimeout(10000);
  const response = await request(app)
    .post("/users/login")
    .send({
      email: "john123@gmail.com",
      password: "johndoe",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login with bad credentials", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "loremispums@gmail.com",
      password: "jhonde",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unortherized user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer token`)
    .send()
    .expect(404);
});

test("should delete the user", async () => {
  await request(app)
    .delete("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("should not delete the user", async () => {
  await request(app)
    .delete("/user/me")
    .set("Authorization", "Bearer token")
    .send()
    .expect(404);
});

test("should upload the avatar image", async () => {
  await request(app)
    .post("/user/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/download.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid user fields", async () => {
  await request(app)
    .patch("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "elisa",
      email: "piyush@gmail.com",
      password: "loremispomeidemore",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("elisa");
});

test("should not update invalid user fields", async () => {
  await request(app)
    .patch("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      gender: "male",
    })
    .expect(400);
});

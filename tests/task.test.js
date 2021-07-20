const request = require("supertest");
const Task = require("../src/models/Task");
const mongoose = require("mongoose");
const {
  setUpDatabase,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  taskOne,
  taskTwo,
  taskThree,
} = require("./fixtures/db");
const app = require("../src/app");
// beforeEach(async () => {
//   await setUpDatabase();
// });

beforeEach(setUpDatabase);
test("should create task for user", async () => {
  //   console.log("task");
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "my task test ",
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});

test("Should not delete other user task", async () => {
  const response = await request(app)
    .delete(`/task/${taskTwo._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskThree._id);
  expect(task).not.toBeNull();
});

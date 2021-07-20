const request = require("supertest");
const Task = require("../src/models/Task");
const mongoose = require("mongoose");
const { setUpDatabase, userOne, userOneId } = require("./fixtures/db");
// beforeEach(async () => {
//   jest.setTimeout(20000);
//   await setUpDatabase();
// });

beforeEach(setUpDatabase, 30000);
test("should create task for user", () => {});

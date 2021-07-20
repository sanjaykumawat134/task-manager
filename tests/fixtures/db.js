const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../../src/app");
const Task = require("../../src/models/Task");
const User = require("../../src/models/User");
// jest.useFakeTimers();

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "john doe",
  email: "john123@gmail.com",
  password: "johndoe",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
const userTwo = {
  _id: userTwoId,
  name: "rohit",
  email: "rohit@gmail.com",
  password: "rohitkumawat",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  completed: false,
  owner: userOne._id,
};
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "second task",
  completed: false,
  owner: userTwo._id,
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "third task",
  completed: false,
  owner: userOne._id,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  setUpDatabase,
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
};

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userOneId = new mongoose.Types.ObjectId();
const User = require("../../src/models/User");

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

const setUpDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  setUpDatabase,
  userOneId,
  userOne,
};

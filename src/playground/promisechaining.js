require("../db/mongoose");
const Task = require("../models/Task");
const User = require("../models/User");
// let _id = "60ec02f6517f0509641921ab";
console.log("i am runnig");
// Task.findByIdAndDelete(_id)
//   .then((task) => {
//     return Task.count({ completed: false });
//   })
//   .then((data) => {
//     console.log(data);
//   });

const updateUserById = async (_id) => {
  await User.findByIdAndUpdate(_id, {
    email: "laracroft@gmail.com",
  });
  const users = await User.countDocuments();
  return users;
};

// updateUserById("60e994d3f751f44840b23606").then((user) => {
//   console.log(user);
// });

const deleteUserById = async (_id, email) => {
  await User.findByIdAndDelete(_id, { email });
  return await User.countDocuments();
};

deleteUserById("60e994d3f751f44840b23606", "laracroft@gmail.com").then(
  (count) => console.log(count)
);

const mongoos = require("mongoose");
mongoos.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// const me = new User({
//   name: "lara tailor           ",
//   age: 20,
//   email: "SDFLKJdffDSFSFSF@gmail.com          ",
//   password: "pd",
// });
// me.save().then(() => {
//   console.log(me);
// });

//Task model

// const task1 = new Task({
//   description: "hair cut",
//   completed: false,
// });

// task1.save().then((data) => {
//   console.log(data);
// });

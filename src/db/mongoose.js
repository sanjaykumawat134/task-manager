const mongoos = require("mongoose");
mongoos.connect(process.env.MONGODB_URL2, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
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

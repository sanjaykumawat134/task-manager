const mongoos = require("mongoose");
const validator = require("validator");
mongoos.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoos.model("User", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.default.isEmail(value)) {
        throw new Error("enter a valid email");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("age should be a positve number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password cannot contain string password");
      }
    },
  },
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
const Task = mongoos.model("task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task1 = new Task({
  description: "hair cut",
  completed: false,
});

task1.save().then((data) => {
  console.log(data);
});

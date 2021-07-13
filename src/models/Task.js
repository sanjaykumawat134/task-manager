const mongoos = require("mongoose");
const validator = require("validator");
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

module.exports = Task;

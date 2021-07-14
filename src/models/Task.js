const mongoose = require("mongoose");
const validator = require("validator");
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})   //innerclass of mongoose
taskSchema.pre('save',async function (next){
  const task =this;
  console.log('middleware running');
})
const Task = mongoose.model("task", taskSchema);

module.exports = Task;

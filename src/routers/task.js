const express = require("express");
const taskRoutes = new express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");
//create new task
taskRoutes.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    res.status(201).send(await task.save());
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all tasks
taskRoutes.get("/tasks", auth, async (req, res) => {
  try {
    //serve all task to specific user
    const user = req.user;
    await user.populate("tasks").execPopulate();
    console.log("task is", user.tasks);
    res.send(user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get task by id
taskRoutes.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;
  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const task = await Task.findOne({ _id, owner: req.user._id });
      if (!task) return res.status(404).send("no task found with this id");
      return res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.json("task id is not valid").send();
  }
});
//update the task
taskRoutes.patch("/task/:id", auth, async (req, res) => {
  const allowedTask = ["description", "completed"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => {
    return allowedTask.includes(update);
  });
  if (!isValidOperation) {
    return res.status(404).send("invalid update!");
  }
  try {
    const _id = req.params.id;

    const updatedTask = await Task.findOne({ _id, owner: req.user._id });
    updates.forEach((update) => {
      updatedTask[update] = req.body[update];
    });
    await updatedTask.save();
    if (!updatedTask) {
      return res.status(400).send();
    }
    res.send(updatedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});
taskRoutes.delete("/task/:id",auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOneAndDelete({_id:_id,owner:req.user._id})
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = taskRoutes;

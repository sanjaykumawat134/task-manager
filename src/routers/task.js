const express = require("express");
const taskRoutes = new express.Router();
const Task = require("../models/Task");

//create new task
taskRoutes.post("/tasks", async (req, res) => {
  // console.log(req.body);
  // const newtask = new Task(req.body);
  // newtask
  //   .save()
  //   .then((data) => res.status(201).send(data))
  //   .catch((error) => res.status(400).send(error));
  try {
    res.send(await new Task(req.body).save());
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all tasks
taskRoutes.get("/tasks", async (req, res) => {
  // Task.find({})
  //   .then((tasks) => {
  //     if (tasks) {
  //       return res.send(tasks);
  //     }
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //   });
  try {
    res.send(await Task.find({}));
  } catch (error) {
    res.status(500).send(error);
  }
});

// get task by id
taskRoutes.get("/task/:id", async (req, res) => {
  const _id = req.params.id;
  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    // Task.findById(_id)
    //   .then((task) => {
    //     if (!task) {
    //       return res.status(404).send("no task found with this id");
    //     } else {
    //       return res.send(task);
    //     }
    //   })
    //   .catch((error) => {
    //     res.status(500).send(error);
    //   });
    try {
      const task = await Task.findById(_id);
      if (!task) return res.status(404).send("no task found with this id");
      return res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.json("task id is not valid").send();
  }
});
// app.get("/home", (req, res) => {
//   res.json().send("kk");
// });
//update the task
taskRoutes.patch("/task/:id", async (req, res) => {
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
    // const updatedTask = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const updatedTask = await Task.findById(_id);
    updates.forEach((update)=>{
      updatedTask[update] = req.body[update];
    })
    await updatedTask.save();
    if (!updatedTask) {
      return res.status(400).send();
    }
    res.send(updatedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});
taskRoutes.delete("/task/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = taskRoutes;

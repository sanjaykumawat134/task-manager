const express = require("express");
require("./db/mongoose");
const User = require("./models/User");
const Task = require("./models/Task");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.post("/users", async (req, res) => {
  // console.log(req.body);
  // const newUser = new User(req.body);
  // newUser
  //   .save()
  //   .then((data) => {
  //     console.log(data);
  //     return res.status(201).send(data);
  //   })
  //   .catch((error) => {
  //     res.status(400);
  //     res.send(error);
  //   });
  try {
    const user = await new User(req.body).save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
  // return res.send("Hello world");
});

//get the users
app.get("/users", async (req, res) => {
  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get user by id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    // User.findById(_id)
    //   .then((user) => {
    //     if (user) {
    //       res.send(user);
    //     } else {
    //       res.status(404).send("user not found");
    //     }
    //   })
    //   .catch((error) => {
    //     res.status(500).send(error);
    //   });
    try {
      const user = await User.findById(_id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("user not found");
      }
    } catch (error) {
      res.send(500).send(error);
    }
  } else {
    res.status(500).send("user id is not valid");
  }
});

//create new task
app.post("/tasks", async (req, res) => {
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
app.get("/tasks", async (req, res) => {
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
app.get("/tasks/:id", async (req, res) => {
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
app.listen(port, () => {
  console.log("Sever started on port" + port);
});

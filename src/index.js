const express = require("express");
require("./db/mongoose");
const userRoutes = require("./routers/users");
const taskRoutes = require("./routers/task");
const app = express();
const port = process.env.PORT || 3000;
// app.use((req, res, next) => {
//   res.status(503).send("site is currently unavailable ! check soon !");
// });
app.use(express.json());
app.use(userRoutes); //user router
app.use(taskRoutes); //task router
app.listen(port, () => {
  console.log("Sever started on port" + port);
});

// const Task = require("./models/Task");
// const User = require("./models/User");
// const main = async ()=>{
//   const user = await User.findById('60f157c69a03f438f44922e9');
//  await user.populate('tasks').execPopulate();
//   console.log(user.tasks)
// }

// main();

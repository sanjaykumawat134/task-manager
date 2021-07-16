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

const express = require("express");
require("./db/mongoose");
const userRoutes = require("./routers/users");
const taskRoutes = require("./routers/task");
const app = express();
app.use(express.json());
app.use(userRoutes); //user router
app.use(taskRoutes); //task router

module.exports = app;

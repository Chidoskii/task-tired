require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/userModel");
const Group = require("./models/groupModel");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/tasks");
const groupRoutes = require("./routes/groups");
const userRoutes = require("./routes/users");

const app = express();

// middleware
// process different types of requests and responses
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(
    "***********************************",
    "\n",
    "route: ",
    req.path,
    "\n",
    "method: ",
    req.method,
    "\n",
    "***********************************"
  );
  next();
});

// routes
// Read data from database
app.get("/", (req, res) => {
  res.send("Hello my good friend!");
});

app.use("/tasks", taskRoutes);
app.use("/groups", groupRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected!");
    app.listen(process.env.PORT, () => {
      console.log(`Node API app is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

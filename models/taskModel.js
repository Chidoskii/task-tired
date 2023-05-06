const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskID: {
      type: Number,
    },
    taskName: {
      type: String,
      required: [true, "Enter a task name"],
    },
    description: {
      type: String,
      required: [true, "Enter a description"],
    },
    priority: {
      type: Number,
      required: [true, "Enter priority rank"],
      min: 1,
      max: 3,
    },
    progress: {
      type: String,
      required: [true, "Pending, In Progress, Suspended, Complete"],
    },
    assignedMembersID: {
      type: Number,
    },
    source: {
      type: String,
    },
    user_id: {
      type: String,
      required: [true, "Enter userID"],
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

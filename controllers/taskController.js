const { default: mongoose } = require("mongoose");
const Task = require("../models/taskModel");
const Archive = require("../models/archiveModel");

// get all tasks
const getAllTasks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all archives
const getAllArchives = async (req, res) => {
  try {
    const user_id = req.user._id;
    const archives = await Archive.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(archives);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all tasks
const getAllCompleteTasks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tasks = await Task.find({
      $or: [
        { user_id, progress: "Complete" },
        { user_id, progress: "Terminated" },
      ],
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get a single task
const getOneTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a new task
const createTask = async (req, res) => {
  const { taskName, description, priority, progress } = req.body;

  let emptyFields = [];

  if (!taskName) {
    emptyFields.push("Task Name");
  }
  if (!description) {
    emptyFields.push("Description");
  }
  if (!priority) {
    emptyFields.push("Priority");
  }
  if (!progress) {
    emptyFields.push("Progress");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const user_id = req.user._id;
    const task = await Task.create({
      taskName,
      description,
      priority,
      progress,
      user_id,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a new archive
const createArchive = async (req, res) => {
  // add to the database
  try {
    const user_id = req.user._id;
    const archive = await Archive.create({
      archiveName,
      description,
      priority,
      progress,
      user_id,
    });
    res.status(200).json(archive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: `cannot find any tasks with ID ${id}` });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }
  try {
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res
        .status(404)
        .json({ message: `cannot find any tasks with ID ${id}` });
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getAllCompleteTasks,
  getOneTask,
  deleteTask,
  updateTask,
  getAllArchives,
  createArchive,
};

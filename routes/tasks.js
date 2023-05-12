const express = require("express");
const {
  createTask,
  getAllTasks,
  getAllCompleteTasks,
  createArchive,
  getAllArchives,
  getOneTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const requireAuth = require("../middleware/requireAuth");

const cors = require("cors");
const router = express.Router();
router.use(express.json());
router.use(cors());

// require authentication for all routes
router.use(requireAuth);

// get all of the tasks
router.get("/", getAllTasks);

// get all of the archiveded tasks
router.get("/completed", getAllCompleteTasks);

// create new archiveded task
router.post("/completed", createArchive);

// get a single task
router.get("/:id", getOneTask);

// create a new task
router.post("/", createTask);

// delete a task
router.delete("/:id", deleteTask);

// update a task
router.put("/:id", updateTask);

module.exports = router;

const express = require("express");
const {
  createGroup,
  getAllGroups,
  getOneGroup,
  deleteGroup,
  updateGroup,
} = require("../controllers/groupController");

const requireAuth = require("../middleware/requireAuth");

const cors = require("cors");
const router = express.Router();
router.use(express.json());
router.use(cors());

// require authentication for all routes
router.use(requireAuth);

// get all of the groups
router.get("/", getAllGroups);

// get a single group
router.get("/:id", getOneGroup);

// create a new group
router.post("/", createGroup);

// delete a group
router.delete("/:id", deleteGroup);

// update a group
router.put("/:id", updateGroup);

module.exports = router;

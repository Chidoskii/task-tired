const express = require("express");
const User = require("../models/userModel");
const {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  loginUser,
  signupUser,
} = require("../controllers/userController");

const cors = require("cors");
const router = express.Router();
router.use(express.json());
router.use(cors());

// login route
router.post("/login", loginUser);

// sign-up route
router.post("/signup", signupUser);

// get all of the users
router.get("/", getAllUsers);

// get a single user
router.get("/:id", getOneUser);

// create a new user
router.post("/", createUser);

// delete a user
router.delete("/:id", deleteUser);

// update a user
router.put("/:id", updateUser);

module.exports = router;

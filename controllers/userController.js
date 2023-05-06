const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const user = await User.signup(fname, lname, email, password);

    // create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get a single user
const getOneUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any users with ID ${id}` });
    }
    res.status(200).json({ message: `deleted the following ${user}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any users with ID ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  signupUser,
  loginUser,
};

const { default: mongoose } = require("mongoose");
const Group = require("../models/groupModel");

// get all groups
const getAllGroups = async (req, res) => {
  try {
    const leaderID = req.user._id;
    const groups = await Group.find({ leaderID }).sort({ createdAt: -1 });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a single group
const getOneGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new group
const createGroup = async (req, res) => {
  const { groupName, company } = req.body;

  try {
    const leaderID = req.user._id;
    const group = await Group.create({ groupName, company, leaderID });
    res.status(200).json(group);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

// delete a group
const deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }
  try {
    const group = await Group.findByIdAndDelete(id);
    if (!group) {
      return res
        .status(404)
        .json({ message: `cannot find any groups with ID ${id}` });
    }
    res.status(200).json({ message: `deleted the following ${group}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a group
const updateGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }
  try {
    const group = await Group.findByIdAndUpdate(id, req.body);
    if (!group) {
      return res
        .status(404)
        .json({ message: `cannot find any groups with ID ${id}` });
    }
    const updatedGroup = await Group.findById(id);
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getOneGroup,
  deleteGroup,
  updateGroup,
};

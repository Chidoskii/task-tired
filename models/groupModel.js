const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    groupID: {
      type: Number,
    },
    groupName: {
      type: String,
      required: [true, "Enter a group name"],
    },
    company: {
      type: String,
      required: [true, "Enter a company name"],
    },
    members: {
      type: String,
    },
    leaderID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;

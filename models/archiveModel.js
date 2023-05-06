const mongoose = require("mongoose");

const archiveSchema = mongoose.Schema(
  {
    archiveName: {
      type: String,
      required: [true, "Enter a archive name"],
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

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;

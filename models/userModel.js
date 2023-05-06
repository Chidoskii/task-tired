const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    userID: {
      type: Number,
    },
    fname: {
      type: String,
      required: [true, "Enter a first name"],
    },
    lname: {
      type: String,
      required: [true, "Enter a last name"],
    },
    email: {
      type: String,
      required: [true, "Enter email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter a password"],
    },
    role: {
      type: String,
    },
    groupID: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// static signup method
userSchema.statics.signup = async function (fname, lname, email, password) {
  // validation
  if (!email || !password) {
    throw Error("Fill in all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must contain: A-Z a-z 0-9 and a special character");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const crystals = await bcrypt.genSalt(10);
  const hashish = await bcrypt.hash(password, crystals);

  const user = await this.create({ fname, lname, email, password: hashish });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Fill in all fields");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid email/password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid email/password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

const AdminCLTN = mongoose.model("Admins", adminSchema);
module.exports = AdminCLTN;

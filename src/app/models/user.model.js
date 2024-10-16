const mongoose = require("mongoose");

const userScema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String, required: false },
    address: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userScema, "user");
module.exports = User;

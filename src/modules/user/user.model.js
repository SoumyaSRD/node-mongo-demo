const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    age: { type: Number, required: false },
    address: { type: String, required: false },
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "user");
module.exports = User;

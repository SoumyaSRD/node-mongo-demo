const mongoose = require("mongoose");

const userScema = mongoose.Schema(
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
        ref: "Department", // Reference to the Post model
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userScema, "user");
module.exports = User;

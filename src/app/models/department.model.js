const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: "Role already exists", // Custom error message
    },
    role: {
      type: String,
      required: [true, "Role Type is required"],
      unique: "Role already exists",
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", DepartmentSchema, "department");
module.exports = Department;

import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: "Role already exists",
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
export default Department;


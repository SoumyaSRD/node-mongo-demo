const Department = require("./department.model");

module.exports.findDepartments = async () => {
  return Department.find({});
};

module.exports.findDepartmentByKey = async (key, value) => {
  return Department.findOne({ [key]: value });
};

module.exports.saveDepartment = async (dep) => {
  const dept = new Department(dep);
  return dept.save();
};

module.exports.updateDepartment = async (dep) => {
  const filter = { _id: dep._id };
  const updateDoc = {
    $set: dep,
  };
  return Department.updateOne(filter, updateDoc);
};

module.exports.deleteDepartment = async (key, value) => {
  return Department.deleteOne({ [key]: value });
};

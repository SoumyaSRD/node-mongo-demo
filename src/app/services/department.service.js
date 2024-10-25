const Department = require(`../models/department.model`);

module.exports.findDepartments = async (key) => {
  return await Department.find({});
};

module.exports.findDepartmentByKey = async (key, value) => {
  console.log(key, value);

  return await Department.findOne({ [key]: value });
};

module.exports.saveDepartment = async (dep) => {
  console.log(dep);

  let dept = new Department(dep);
  return await dept.save();
};

module.exports.updateDepartment = async (dep) => {
  const filter = { _id: dep._id };
  const updateDoc = {
    $set: dep,
  };
  return await Department.updateOne(filter, updateDoc);
};

module.exports.deleteDepartment = async (key, value) => {
  return await Department.deleteOne({ [key]: value });
};

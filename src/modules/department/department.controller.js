const DepartmentService = require("./department.service");

module.exports.findDepartments = async (req, res, next) => {
  try {
    const data = await DepartmentService.findDepartments();
    return res.status(200).json({
      data,
      message: "Departments fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.findDepartmentById = async (req, res, next) => {
  try {
    const data = await DepartmentService.findDepartmentByKey(
      "_id",
      req.params.id
    );
    return res.status(200).json({
      data,
      message: "Department fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.saveDepartment = async (req, res, next) => {
  try {
    const data = await DepartmentService.saveDepartment(req.body);
    return res.status(200).json({
      data,
      message: "Department saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateDepartment = async (req, res, next) => {
  try {
    const data = await DepartmentService.updateDepartment(req.body);
    return res.status(200).json({
      data,
      message: "Department updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteDepartment = async (req, res, next) => {
  try {
    const data = await DepartmentService.deleteDepartment("_id", req.params.id);
    return res.status(200).json({
      data,
      message: "Department deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

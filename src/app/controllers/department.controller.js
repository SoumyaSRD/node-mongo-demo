const DepartmentService = require(`../services/department.service`);

module.exports.findDepartments = async (req, res, next) => {
  try {
    const data = await DepartmentService.findDepartments({});
    return res.status(200).json({
      data,
      message: "User fetched successfully",
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
      message: "User fetched successfully",
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
      message: "User saved successfully",
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
      message: "User updated successfully",
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
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

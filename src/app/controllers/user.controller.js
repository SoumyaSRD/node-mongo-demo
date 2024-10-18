const UserService = require("../services/user.service");

const IUser = require(`../interfaces/user.interface`);

const bcrypt = require("bcrypt");
const { SALT } = require("../../config/keys");

module.exports.findAllUser = async (req, res, next) => {
  try {
    const data = await UserService.findAllUser({});
    return res.status(200).json({
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      error: "User fetching issue",
    });
  }
};

module.exports.findUserById = async (req, res, next) => {
  try {
    const data = await UserService.findUserById({ id: req.param.id });
    res.status(200).json({
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      error: "User fetching issue",
    });
  }
};

module.exports.findUserByEmail = async (req, res, next) => {
  try {
    const data = await UserService.findUserByEmail({ id: req.body.email });
    res.status(200).json({
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      error: "User fetching issue",
    });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const user = new IUser(req.body);
    const data = await UserService.updateUser(user);
    return res.status(200).json({
      data,
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      error: "User updation failed",
    });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = await UserService.deleteUser(_id);
    if (data) {
      return res.status(200).json({
        data,
        message: "User deleted successfully",
      });
    } else {
      return res.status(404).json({
        data,
        message: "User does not exist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      error: "User deletion failed",
    });
  }
};

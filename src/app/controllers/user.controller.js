const UserService = require("../services/user.service");

const IUser = require(`../interfaces/user.interface`);

const bcrypt = require("bcrypt");
const { SALT } = require("../../config/keys");
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
module.exports.findAllUser = async (req, res, next) => {
  try {
    const data = await UserService.findAllUser({});
    return res.status(200).json({
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
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
    next(error);
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
    next(error);
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
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = await UserService.deleteUser(_id);

    return res.status(200).json({
      data,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.upload = async (req, res, next) => {
  console.log("controller", req.file);
  return;
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
    next(error);
  }
};

module.exports.filterUser = async (req, res, next) => {
  try {
    const { page, limit, ...filterData } = req.body;

    console.log("controller", filterData);
    // return;
    const data = await UserService.filterUser(filterData, page, limit);
    if (data) {
      return res.status(200).json({
        data,
        message: "User filtered successfully",
      });
    } else {
      return res.status(404).json({
        data,
        message: "User does not exist",
      });
    }
  } catch (error) {
    next(error);
  }
};

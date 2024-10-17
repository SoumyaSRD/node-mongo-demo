const UserService = require("../services/user.service");

const IUser = require(`../interfaces/user.interface`);

module.exports.findAllUser = async (req, res, next) => {
  try {
    const data = await UserService.findAllUser({});
    return res.json({
      statusCode: 200,
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      error,
      error: "User fetching issue",
    });
  }
};

module.exports.findUserById = async (req, res, next) => {
  try {
    const data = await UserService.findUserById({ id: req.param.id });
    res.json({
      statusCode: 200,
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      statusCode: 500,
      error,
      error: "User fetching issue",
    });
  }
};

module.exports.findUserByEmail = async (req, res, next) => {
  try {
    const data = await UserService.findUserByEmail({ id: req.body.email });
    res.json({
      statusCode: 200,
      data,
      message: "User fetched successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      statusCode: 500,
      error,
      error: "User fetching issue",
    });
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const user = new IUser(req.body);
    let existUser = await UserService.findUser(user);
    console.log("existUser", existUser);

    if (existUser) {
      return res.json({
        statusCode: 409,
        message: `${user.name} User already exists`,
      });
    }

    const data = await UserService.createUser(user);
    return res.json({
      statusCode: 200,
      data,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.json({
      statusCode: 400,
      error,
      error: "User creation failed",
    });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const user = new IUser(req.body);
    const data = await UserService.updateUser(user);
    return res.json({
      statusCode: 200,
      data,
      message: "User updated successfully",
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      error,
      error: "User updation failed",
    });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    console.log(req.params);

    const _id = req.params.id;
    const data = await UserService.deleteUser(_id);
    if (data) {
      return res.json({
        statusCode: 200,
        data,
        message: "User deleted successfully",
      });
    } else {
      return res.json({
        statusCode: 404,
        data,
        message: "User does not exist",
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      error,
      error: "User deletion failed",
    });
  }
};

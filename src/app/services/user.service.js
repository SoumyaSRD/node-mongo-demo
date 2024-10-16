const User = require("../models/user.model");

module.exports.findAllUser = async () => {
  return await User.find({});
};

module.exports.findUserById = async (id) => {
  return await User.findOne({ id });
};

module.exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports.createUser = async (user) => {
  saveUser = new User(user);
  return await saveUser.save();
};

module.exports.findUser = async (user) => {
  return await User.findOne({
    $or: [{ phone: user.phone }, { email: user.email }],
  });
};

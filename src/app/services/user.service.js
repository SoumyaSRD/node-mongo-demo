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

module.exports.updateUser = async (user) => {
  updateUser = new User(user);
  return await updateUser.findByIdAndUpdate(user._id, user);
};

module.exports.findUser = async (user) => {
  return await User.findOne({
    $or: [{ phone: user.phone }, { email: user.email }],
  });
};

module.exports.deleteUser = async (_id) => {
  return await User.findByIdAndDelete(_id);
};

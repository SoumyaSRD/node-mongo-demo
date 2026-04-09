const User = require("./user.model");
const { dynamicSearch } = require("../../app/services/common.service");

module.exports.findAllUser = async () => {
  return User.find({});
};

module.exports.findUserById = async (id) => {
  return User.findById(id);
};

module.exports.findUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports.updateUser = async (user) => {
  return User.findByIdAndUpdate(user._id, user, {
    new: true,
    runValidators: true,
  });
};

module.exports.findUser = async ({ email, phone }) => {
  return User.findOne({
    $or: [{ phone }, { email }],
  });
};

module.exports.deleteUser = async (_id) => {
  return User.findByIdAndDelete(_id);
};

module.exports.filterUser = (searchParams, page, limit) => {
  const lookUps = [
    {
      from: "department",
      localField: "departments",
      foreignField: "_id",
      as: "departments",
    },
  ];
  return dynamicSearch(User, searchParams, page, limit, {}, lookUps);
};

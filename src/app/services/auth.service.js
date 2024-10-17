const User = require("../models/user.model");

module.exports.findUserWithPassword = async (user) => {
  return User.findOne({
    $or: [{ phone: user.phone }, { email: user.email }],
  })
    .select("+password")
    .exec();
};

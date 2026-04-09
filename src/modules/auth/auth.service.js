const User = require("../user/user.model");

module.exports.findUserWithPassword = async ({ email, phone }) => {
  return User.findOne({
    $or: [{ phone }, { email }],
  })
    .select("+password")
    .exec();
};

module.exports.createUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();

  const { password, ...userWithoutPassword } = newUser.toObject();
  return userWithoutPassword;
};

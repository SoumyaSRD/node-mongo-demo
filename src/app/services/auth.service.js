const User = require("../models/user.model");

module.exports.findUserWithPassword = async (user) => {
  return User.findOne({
    $or: [{ phone: user.phone }, { email: user.email }],
  })
    .select("+password")
    .exec();
};

module.exports.createUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();

  // Exclude password before sending user data
  const { password, ...userWithoutPassword } = newUser.toObject();
  console.log("User created:", userWithoutPassword);
  return userWithoutPassword;
};

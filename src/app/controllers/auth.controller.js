const { createSecretToken } = require("../../middlewares/auth/auth.middleware");
const { findUserWithPassword } = require("../services/auth.service");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  const { email, phone, password } = req.body;
  if (!((email || phone) && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await findUserWithPassword({ email, phone });

  if (!(user && (await bcrypt.compare(password, user.password)))) {
    console.log(
      ">>>" < user && (await bcrypt.compare(password, user.password))
    );

    return res.status(404).json({ message: "Invalid credentials" });
  }
  console.log(">>>>>");

  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    domain: process.env.frontend_url, // Set your domain here
    path: "/", // Cookie is accessible from all paths
    expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
    secure: true, // Cookie will only be sent over HTTPS
    httpOnly: true, // Cookie cannot be accessed via client-side scripts
    sameSite: "None",
  });

  return res
    .status(200)
    .json({ message: "User logged in successfully.", data: token });
};

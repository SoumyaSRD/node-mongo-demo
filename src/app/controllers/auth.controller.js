const { SALT } = require("../../config/keys");
const { createSecretToken } = require("../../middlewares/auth/auth.middleware");
const IUser = require("../interfaces/user.interface");
const AuthService = require("../services/auth.service");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res, next) => {
  try {
    const user = new IUser(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, +SALT);
    user.password = hashedPassword;

    let existUser = await AuthService.findUserWithPassword(user);

    if (existUser) {
      return res.status(409).json({
        statusCode: 409,
        message: `User already exists`,
      });
    }

    let data = await AuthService.createUser(user);
    if (data) {
      return res.status(200).json({
        statusCode: 200,
        data,
        message: "User registered successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      error,
      message: "User registration failed",
    });
  }
};

module.exports.login = async (req, res) => {
  const { email, phone, password } = req.body;
  if (!((email || phone) && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await AuthService.findUserWithPassword({ email, phone });

  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }

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

module.exports.logout = async (req, res) => {
  const cookies = req.cookies;
  for (let cookie in cookies) {
    res.clearCookie(cookie);
  }

  return res
    .status(200)
    .json({ message: "User logged out successfully.", data: null });
};

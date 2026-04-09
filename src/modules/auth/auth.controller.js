const bcrypt = require("bcrypt");

const { SALT } = require("../../config/keys");
const { createSecretToken } = require("../../middlewares/auth/auth.middleware");
const IUser = require("../user/user.interface");
const AuthService = require("./auth.service");

module.exports.createUser = async (req, res, next) => {
  try {
    const user = new IUser(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, Number(SALT));
    user.password = hashedPassword;

    const data = await AuthService.createUser(user);

    return res.status(200).json({
      statusCode: 200,
      data,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, phone, password } = req.body;
  try {
    if (!((email || phone) && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const user = await AuthService.findUserWithPassword({ email, phone });

    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = createSecretToken(user);

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "Strict" : "Lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: "User logged in successfully.", data: token });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  // Explicitly clear known auth cookie with same attributes.
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "Strict" : "Lax",
    path: "/",
  });

  return res
    .status(200)
    .json({ message: "User logged out successfully.", data: null });
};

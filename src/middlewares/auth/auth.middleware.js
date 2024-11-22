require("dotenv").config();
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../../config/keys");

module.exports.createSecretToken = (user) => {
  return jwt.sign(
    { id: user._id, type: user.type, name: user.name },
    TOKEN_KEY,
    { algorithm: "HS256", expiresIn: 3 * 24 * 60 * 60 }
  );
};

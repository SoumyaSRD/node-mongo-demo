require("dotenv").config();
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../../config/keys");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const dotenv = require("dotenv");
dotenv.config();

const { PORT, MONGO_URI, SALT, TOKEN_KEY } = process.env;

module.exports = { PORT, MONGO_URI, SALT, TOKEN_KEY };

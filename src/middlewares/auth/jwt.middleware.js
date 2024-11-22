const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = require("../../config/keys");

// Authentication middleware
function authenticateJWT(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Attach the user information to the request object
    next(); // Pass control to the next middleware or route handler
  });
}

module.exports = authenticateJWT;

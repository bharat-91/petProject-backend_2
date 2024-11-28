const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header (Bearer token)

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token exists in the database
    const storedToken = await Token.findOne({ token });
    if (!storedToken) {
      return res
        .status(401)
        .json({ message: "Invalid token or token not found" });
    }

    // Attach the user information to the request object
    req.user = decoded; // Now you can access `req.user` in protected routes
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;

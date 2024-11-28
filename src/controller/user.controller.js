const Token = require("../models/token.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");

const createUser = async (req, res) => {
  try {
    const result = await userService.createUserService(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUserService(email, password);
    res.status(200).json({
      message: "Login successful",
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { token } = req.body;

    const deletedToken = await Token.deleteOne({ token });

    if (deletedToken.deletedCount === 0) {
      return res
        .status(400)
        .json({ message: "Token not found or already invalidated" });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Error logging out" });
  }
};
module.exports = { createUser, loginUser, logoutUser };

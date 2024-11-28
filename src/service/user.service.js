const Token = require("../models/token.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createUserService = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  const newToken = new Token({
    userId: user._id,
    token,
  });
  await newToken.save();
  return { token, user };
};

module.exports = { createUserService, loginUserService };

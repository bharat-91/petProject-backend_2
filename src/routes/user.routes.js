const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controller/user.controller");
const router = express.Router();

router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.post("/users/logout", logoutUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db.js");
const { jwtAuthMiddleware } = require("../Auth/jwt");
const User = require("../Models/user");

// Get all users
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.findById(user.id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user password

router.put("/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const { password } = req.body;
    const userData = await User.findById(user.id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    userData.password = password;
    await userData.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

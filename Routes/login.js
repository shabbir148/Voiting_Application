const express = require("express");
const router = express.Router();
const db = require("../db.js");
const { genrateToken } = require("../Auth/jwt");

const User = require("../Models/user");

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    const result = await user.save();
    const payload = {
      id: result._id,
      name: result.name,
      role: result.role,
    };
    const token = genrateToken(payload);
    res.status(201).json({ result, token });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});

// Login route
router.get("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await user.comparedPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = {
      id: user._id,
      name: user.name,
      role: user.role,
    };
    const token = genrateToken(payload);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

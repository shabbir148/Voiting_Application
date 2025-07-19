const express = require("express");
const router = express.Router();
const db = require("../db.js");
const { jwtAuthMiddleware } = require("../Auth/jwt");
const Candidate = require("../Models/candidate");

// check user  is admin or not
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// create a new candidate
router.post("/", jwtAuthMiddleware, isAdmin, async (req, res) => {
  try {
    const candidateData = req.body;
    const candidate = new Candidate(candidateData);
    const result = await candidate.save();
    res.status(201).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all candidates
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({ candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update a candidate
router.put("/:id", jwtAuthMiddleware, isAdmin, async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidateData = req.body;
    const result = await Candidate.findByIdAndUpdate(
      candidateId,
      candidateData,
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//deletee a candidate
router.delete("/:id", jwtAuthMiddleware, isAdmin, async (req, res) => {
  try {
    const candidateId = req.params.id;
    const result = await Candidate.findByIdAndDelete(candidateId);
    if (!result) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Candidate = require("../Models/candidate");
const User = require("../Models/user");

const app = express();

const { jwtAuthMiddleware } = require("../Auth/jwt");

// cast vote
router.post("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  const candidateId = req.params.candidateId;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (user.role !== "voter") {
      return res.status(400).json({ message: "You are not a voter" });
    }
    if (user.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    candidate.vote.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();
    res.status(200).json({ message: "Vote casted successfully", candidate });
    // Update user voted status
    user.isVoted = true;
    await user.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all votes for a candidate
router.get("/count", async (req, res) => {
  try {
    const candidate = await Candidate.find()
      .sort({ voteCount: "desc" })
      .select("name voteCount");
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json(candidate.map((c) => c));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

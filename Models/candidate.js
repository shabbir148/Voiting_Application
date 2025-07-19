const mangoose = require("mongoose");

const candidateSchema = new mangoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  vote: {
    type: [
      {
        user: {
          type: mangoose.Schema.Types.ObjectId,
          ref: "User",
        },
        voteAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

const Candidate = mangoose.model("Candidate", candidateSchema);
module.exports = Candidate;

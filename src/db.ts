import { timeStamp } from "console";
import { ref } from "firebase/database";
import mongoose, { Schema } from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  point: Number,
  difficulty: String,
  topic_tags: [String],
  last_user_solved: { type: Schema.Types.ObjectId, ref: "User" },
  problem_stats: {
    total_submit_count: Number,
    total_correct_count: Number,
  },
  examples: [
    {
      input: String,
      output: String,
      explaination: String,
    },
  ],
  hints: [String],
  companies:[String],
  constraints:[String]
});

const userSchema = new mongoose.Schema({
  name: String,
  avatar_img: String,
  points_scored: Number,
});

const submissionSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    problem: { type: Schema.Types.ObjectId, ref: "Problem" },
    problem_correct: Boolean,
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Problem =
  mongoose.models.Problem || mongoose.model("Problem", problemSchema);
export const Submission =
  mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Programming",
        "Design",
        "Marketing",
        "Management",
        "Data Science",
        "AI / ML",
        "Cloud",
        "Content Writing",
        "Soft Skill",
        "Other",
      ],
      default: "Other",
    },

    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to user who has this skill
      required: true,
    },

    endorsements: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        endorsedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    aiScore: {
      type: Number,
      default: 0, // Useful for AI-based skill matching (LLM score)
    },

    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);

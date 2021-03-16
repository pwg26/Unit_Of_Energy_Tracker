const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessSchem = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },

  exerciseType: {
    type: String,
    trim: true,
    required: "What type of exercise?",
  },
  exerciseName: {
    type: String,
    trim: true,
    required: "what is the exercise called",
  },
  exerciseDuration: {
    type: Number,
    required: "Enter the exercise's duration(min)",
  },
  exerciseWeight: {
    type: Number,
    required: "what is the amount of weight per rep(lbs) used in the exercise",
  },
  exerciseReps: {
    type: Number,
    required: "what are the amount of reps used in the exercise",
  },
  exerciseSets: {
    type: Number,
    required: "what are the amount of sets used in the exercise",
  },
  exerciseDistance: {
    type: Number,
    required: "what was the distance covered during the exercise",
  },
});

const Fitness = mongoose.model("Fitness", fitnessSchem);

module.exports = Fitness;

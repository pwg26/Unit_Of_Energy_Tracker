const router = require("express").Router();
const WO = require("../models/model.js");
const path = require("path");

// HTML routes

// Routes to index.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
//Routes to exercise.html
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});
//Routes stats.html
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

///API routes
//   contiue last workout
router.get("/api/workouts", (req, res) => {
  WO.find({})
    .sort({ day: -1 })
    .limit(1)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//add excerise to created workout
router.put("/api/workouts/:id", (req, res) => {
  WO.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// add last 7 workouts to fitness tracking page
router.get("/api/workouts/range", (req, res) => {
  WO.find({})
    .sort({ day: -1 })
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    });
});

module.exports = router;

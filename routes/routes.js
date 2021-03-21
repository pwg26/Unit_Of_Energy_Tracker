const router = require("express").Router();
const WO = require("../models/models");
const path = require("path");

// HTML routes===========================================

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

///API routes============================================
//   contiue last workout
router.get("/api/workouts", (req, res) => {
  WO.find({}).then((dbWorkout) => {
    //console.log(data);
    res.json(dbWorkout);
  });
});

// router.get("/api/workouts", (req, res) => {
//   WO.aggregate([
//     { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
//   ]).then((data) => {
//     //console.log(data);
//     res.json(data);
//   });
// });

router.post("/api/workouts", (req, res) => {
  WO.create(req.body).then((dbWorkout) => res.json(dbWorkout));
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

// router.put("/api/workouts/:id", (req, res) => {
//   WO.aggregate([
//     { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
//   ])
//     .then((data) => {
//       //console.log(data);
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// add last 7 workouts to fitness tracking page
router.get("/api/workouts/range", (req, res) => {
  WO.find({}).sort({ day: -1 }).limit(7);
  WO.aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
  ]).then((dbWorkout) => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  });
});

// to get totat stats up and running
// router.get("/api/workouts", (req, res) => {
//   WO.aggregate([
//     { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
//   ])
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

module.exports = router;

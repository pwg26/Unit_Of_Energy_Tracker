// var path = require("path");
// const Workout = require("../models/model.js");
// const router = require("express").Router();

// // HTML Routes

// module.exports = function (router) {
//   // HTML Routes================================================================
//   // moves to exercise page
//   router.get("/exercise", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/exercise.html"));
//   });

//   //   moves to stat page
//   router.get("/stats", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/stats.html"));
//   });

//   // API Routes================================================================

//   //   get last workout
//   router.get("/api/workouts", (req, res) => {
//     Workout.find({})
//       .sort({ date: -1 })
//       .then(
//         ((dbWorkout) => {
//           res.json(dbWorkout);
//         }).catch((err) => {
//           res.status(400).json(err);
//         })
//       );
//   });

//   //   add exercise
//   router.put("/api/workouts/:id", ({ body, params }, res) => {
//     Workout.insert({ _id: params.id, body })
//       .then((dbWorkout) => {
//         res.json(dbWorkout);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   //   create exercise
//   router.post("/api/workouts", ({ body }, res) => {
//     Workout.create(body)
//       .then((dbWorkout) => {
//         res.json(dbWorkout);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//
//   app.get("/api/workouts/range", ({ body }, res) => {
//     Fitness.find(body)
//       .then((dbFitness) => {
//         res.json(dbFitness);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });
// };

// =====================================================

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

//create new workout
router.post("/api/workouts", ({ body }, res) => {
  WO.create(body).then((dbWorkout) => {
    res.json(dbWorkout);
  });
});

//add excerise to created workout
router.put("/api/workouts/:id", ({ params, body }, res) => {
  WOinsertMany(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;

var path = require("path");
var db = require("../models");

// HTML Routes

module.exports = function (app) {
  // displays last exercise
  app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  //   displays exercise states
  app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
};

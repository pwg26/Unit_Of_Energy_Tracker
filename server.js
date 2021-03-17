const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/routes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

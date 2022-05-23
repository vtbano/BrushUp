const express = require("express");
const bodyParser = require("body-parser");
const creators = require("./routes/creators");
const quizzes = require("./routes/quizzes");
const questions = require("./routes/questions");

const app = express();

app.use(bodyParser.json());
app.use("/creators", creators);
app.use("/quizzes", quizzes);
app.use("/questions", questions);

app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;

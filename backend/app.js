const express = require("express");
const bodyParser = require("body-parser");
const creators = require("./routes/creators");
const quizzes = require("./routes/quizzes");
const questions = require("./routes/questions");
const answer_options = require("./routes/answer_options");

const app = express();

app.use(bodyParser.json());
app.use("/creators", creators);
app.use("/quizzes", quizzes);
app.use("/questions", questions);
app.use("/answer_options", answer_options);

app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;

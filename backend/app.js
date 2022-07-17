require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const creators = require("./routes/creators");
const quizzes = require("./routes/quizzes");
const cors = require("cors");
const app = express();
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(
  cookieSession({
    name: "session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
    sameSite: "strict",
  })
);
app.use(bodyParser.json());
app.use("/creators", creators);
app.use("/quizzes", quizzes);

app.use((err, req, res, next) => {
  res.json(err);
});

// app.listen(port, () => console.log(`listening on port ${port}`));
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

module.exports = app;

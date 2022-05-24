const { Router } = require("express");
const pool = require("../db");
const router = Router();

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM quizzes ORDER BY id ASC", (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;

  pool.query("SELECT * FROM quizzes WHERE id=$1", [id], (err, res) => {
    if (err) return next(err);
    if (res.rows.length === 0)
      return response.json({
        error: true,
        message: "This quiz does not exist",
      });
    response.json(res.rows[0]);
  });
});

router.post("/", (request, response, next) => {
  const { title } = request.body;

  pool.query("INSERT INTO quizzes (title) VALUES ($1)", [title], (err, res) => {
    if (err) return next(err);
    response.redirect("/quizzes");
  });
});

router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const keys = ["title"];

  const fields = [];

  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE quizzes SET ${field}=($1) WHERE id=($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) response.redirect("/quizzes");
      }
    );
  });
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("DELETE FROM quizzes WHERE id=($1)", [id], (err, res) => {
    if (err) return next(err);

    response.redirect("/quizzes");
  });
});

router.get("/:id/questions", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM questions WHERE quizzes_id=$1",
    [id],
    (err, res) => {
      if (err) return next(err);
      if (res.rows.length === 0)
        return response.json({
          error: true,
          message: "Questions do not exist",
        });
      response.json(res.rows);
    }
  );
});

router.get(
  "/:quizzes_id/questions/:questions_id",
  (request, response, next) => {
    const { quizzes_id, questions_id } = request.params;

    pool.query(
      "SELECT * FROM questions WHERE quizzes_id=$1 AND id=$2",
      [quizzes_id, questions_id],
      (err, res) => {
        if (err) return next(err);
        if (res.rows.length === 0)
          return response.json({
            error: true,
            message: "This question does not exist",
          });
        response.json(res.rows[0]);
      }
    );
  }
);

module.exports = router;

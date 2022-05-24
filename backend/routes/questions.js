const { Router } = require("express");
const pool = require("../db");
const router = Router();

// router.get("/", (request, response, next) => {
//   pool.query("SELECT * FROM questions ORDER BY id ASC", (err, res) => {
//     if (err) return next(err);
//     response.json(res.rows);
//   });
// });

router.get("/:id", (request, response, next) => {
  const { id } = request.params;

  pool.query("SELECT * FROM questions WHERE id=$1", [id], (err, res) => {
    if (err) return next(err);
    if (res.rows.length === 0)
      return response.json({
        error: true,
        message: "This question does not exist",
      });
    response.json(res.rows[0]);
  });
});

router.post("/", (request, response, next) => {
  const { question_text, image } = request.body;

  pool.query(
    "INSERT INTO questions (question_text,image) VALUES ($1,$2)",
    [question_text, image],
    (err, res) => {
      if (err) return next(err);
      response.redirect("/questions");
    }
  );
});

router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const keys = ["question_text", "image"];

  const fields = [];

  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE questions SET ${field}=($1) WHERE id=($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) response.redirect("/questions");
      }
    );
  });
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("DELETE FROM questions WHERE id=($1)", [id], (err, res) => {
    if (err) return next(err);

    response.redirect("/questions");
  });
});
module.exports = router;

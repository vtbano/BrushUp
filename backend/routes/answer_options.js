// const { Router } = require("express");
// const pool = require("../db");
// const router = Router();

// router.get("/", (request, response, next) => {
//   pool.query("SELECT * FROM answer_options ORDER BY id ASC", (err, res) => {
//     if (err) return next(err);
//     response.json(res.rows);
//   });
// });

// router.get("/:id", (request, response, next) => {
//   const { id } = request.params;

//   pool.query("SELECT * FROM answer_options WHERE id=$1", [id], (err, res) => {
//     if (err) return next(err);
//     if (res.rows.length === 0)
//       return response.json({
//         error: true,
//         message: "This answer option does not exist",
//       });
//     response.json(res.rows[0]);
//   });
// });

// router.post("/", (request, response, next) => {
//   const { correct, answer_text } = request.body;

//   pool.query(
//     "INSERT INTO answer_options(correct, answer_text) VALUES ($1,$2)",
//     [correct, answer_text],
//     (err, res) => {
//       if (err) return next(err);
//       response.redirect("/answer_options");
//     }
//   );
// });

// router.put("/:id", (request, response, next) => {
//   const { id } = request.params;
//   const keys = ["correct", "answer_text"];

//   const fields = [];

//   keys.forEach((key) => {
//     if (request.body[key]) fields.push(key);
//   });

//   fields.forEach((field, index) => {
//     pool.query(
//       `UPDATE answer_options SET ${field}=($1) WHERE id=($2)`,
//       [request.body[field], id],
//       (err, res) => {
//         if (err) return next(err);
//         if (index === fields.length - 1) response.redirect("/answer_options");
//       }
//     );
//   });
// });

// router.delete("/:id", (request, response, next) => {
//   const { id } = request.params;
//   pool.query("DELETE FROM answer_options WHERE id=($1)", [id], (err, res) => {
//     if (err) return next(err);

//     response.redirect("/answer_options");
//   });
// });
// module.exports = router;

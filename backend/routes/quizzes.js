const { Router } = require("express");
const pool = require("../db");
const router = Router();

//QUIZ ROUTES
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
  const { creators_id, title } = request.body;

  pool.query(
    "INSERT INTO quizzes (creators_id,title) VALUES ($1,$2)",
    [creators_id, title],
    (err, res) => {
      if (err) return next(err);
      response.redirect("/quizzes");
    }
  );
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

//QUESTION ROUTES
router.get("/:quizzes_id/questions", (request, response, next) => {
  const { quizzes_id } = request.params;
  pool.query(
    "SELECT * FROM questions WHERE quizzes_id=$1",
    [quizzes_id],
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

router.post("/:quizzes_id/questions", (request, response, next) => {
  const { quizzes_id, question_text, image } = request.body;

  pool.query(
    "INSERT INTO questions (quizzes_id,question_text,image) VALUES ($1,$2,$3)",
    [quizzes_id, question_text, image],
    (err, res) => {
      if (err) return next(err);
      response.redirect(`/quizzes/${quizzes_id}/questions`);
    }
  );
});

router.put(
  "/:quizzes_id/questions/:questions_id",
  (request, response, next) => {
    const { quizzes_id, questions_id } = request.params;
    const keys = ["question_text", "image"];

    const fields = [];

    keys.forEach((key) => {
      if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
      pool.query(
        `UPDATE questions SET ${field}=($1) WHERE quizzes_id=($2) AND id=($3)`,
        [request.body[field], quizzes_id, questions_id],
        (err, res) => {
          if (err) return next(err);
          if (index === fields.length - 1)
            response.redirect(`/quizzes/${quizzes_id}/questions`);
        }
      );
    });
  }
);

router.delete(
  "/:quizzes_id/questions/:questions_id",
  (request, response, next) => {
    const { quizzes_id, questions_id } = request.params;
    pool.query(
      "DELETE FROM questions WHERE quizzes_id=$1 AND id=$2",
      [quizzes_id, questions_id],
      (err, res) => {
        if (err) return next(err);

        response.redirect(`/quizzes/${quizzes_id}/questions`);
      }
    );
  }
);

//ANSWER_OPTIONS

router.get(
  "/:quizzes_id/questions/:questions_id/answer_options",
  (request, response, next) => {
    pool.query("SELECT * FROM answer_options ORDER BY id ASC", (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    });
  }
);

router.get(
  "/:quizzes_id/questions/:questions_id/answer_options/:id",
  (request, response, next) => {
    const { questions_id, id } = request.params;

    pool.query(
      "SELECT * FROM answer_options WHERE questions_id=$1 AND id=$2",
      [questions_id, id],
      (err, res) => {
        if (err) return next(err);
        if (res.rows.length === 0)
          return response.json({
            error: true,
            message: "This answer option does not exist",
          });
        response.json(res.rows[0]);
      }
    );
  }
);

router.post(
  "/:quizzes_id/questions/:questions_id/answer_options",
  (request, response, next) => {
    const { questions_id, correct, answer_text } = request.body;
    const { quizzes_id } = request.params;

    pool.query(
      "INSERT INTO answer_options(questions_id,correct, answer_text) VALUES ($1,$2,$3)",
      [questions_id, correct, answer_text],
      (err, res) => {
        if (err) return next(err);
        response.redirect(
          `/quizzes/${quizzes_id}/questions/${questions_id}/answer_options`
        );
      }
    );
  }
);

router.put(
  "/:quizzes_id/questions/:questions_id/answer_options/:id",
  (request, response, next) => {
    const { quizzes_id, questions_id, id } = request.params;
    const keys = ["correct", "answer_text"];

    const fields = [];

    keys.forEach((key) => {
      if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
      pool.query(
        `UPDATE answer_options SET ${field}=($1) WHERE questions_id=($2) AND id=($3)`,
        [request.body[field], questions_id, id],
        (err, res) => {
          if (err) return next(err);
          if (index === fields.length - 1)
            response.redirect(
              `/quizzes/${quizzes_id}/questions/${questions_id}/answer_options`
            );
        }
      );
    });
  }
);

router.delete(
  "/:quizzes_id/questions/:questions_id/answer_options/:id",
  (request, response, next) => {
    const { quizzes_id, questions_id, id } = request.params;
    pool.query(
      "DELETE FROM answer_options WHERE questions_id=($1) AND id=($2)",
      [questions_id, id],
      (err, res) => {
        if (err) return next(err);

        response.redirect(
          `/quizzes/${quizzes_id}/questions/${questions_id}/answer_options`
        );
      }
    );
  }
);

//RESPONDENTS

router.get("/:quizzes_id/respondents", (request, response, next) => {
  const { quizzes_id } = request.params;
  pool.query(
    "SELECT * FROM respondents WHERE quizzes_id=$1",
    [quizzes_id],
    (err, res) => {
      if (err) return next(err);
      if (res.rows.length === 0)
        return response.json({
          error: true,
          message: "There are no respondents",
        });
      response.json(res.rows);
    }
  );
});

router.get(
  "/:quizzes_id/respondents/:respondent_id",
  (request, response, next) => {
    const { quizzes_id, respondent_id } = request.params;

    pool.query(
      "SELECT * FROM respondents WHERE quizzes_id=($1) AND id=($2)",
      [quizzes_id, respondent_id],
      (err, res) => {
        if (err) return next(err);
        if (res.rows.length === 0)
          return response.json({
            error: true,
            message: "This respondent does not exist",
          });
        response.json(res.rows[0]);
      }
    );
  }
);

router.post("/:quizzes_id/respondents", (request, response, next) => {
  const { quizzes_id, email, secret } = request.body;

  pool.query(
    "INSERT INTO respondents (quizzes_id,email, secret) VALUES ($1,$2,$3)",
    [quizzes_id, email, secret],
    (err, res) => {
      if (err) return next(err);
      response.redirect(`/quizzes/${quizzes_id}/respondents`);
    }
  );
});

router.put(
  "/:quizzes_id/respondents/:respondent_id",
  (request, response, next) => {
    const { quizzes_id, respondent_id } = request.params;
    const keys = ["email", "secret"];

    const fields = [];

    keys.forEach((key) => {
      if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
      pool.query(
        `UPDATE respondents SET ${field}=($1) WHERE quizzes_id=($2) AND id=($3)`,
        [request.body[field], quizzes_id, respondent_id],
        (err, res) => {
          if (err) return next(err);
          if (index === fields.length - 1)
            response.redirect(`/quizzes/${quizzes_id}/respondents`);
        }
      );
    });
  }
);

router.delete(
  "/:quizzes_id/respondents/:respondent_id",
  (request, response, next) => {
    const { quizzes_id, respondent_id } = request.params;
    pool.query(
      "DELETE FROM respondents WHERE quizzes_id=$1 AND id=$2",
      [quizzes_id, respondent_id],
      (err, res) => {
        if (err) return next(err);

        response.redirect(`/quizzes/${quizzes_id}/respondents`);
      }
    );
  }
);

//RESPONSES

// GET http://www.brushup.com/quizzes/ID/respondents/ID/answer_options/ID

router.get(
  "/:quizzes_id/respondents/:respondent_id/answer_options/:answer_options_id",
  (request, response, next) => {
    const { quizzes_id, respondent_id, answer_options_id } = request.params;

    pool.query(
      "SELECT * FROM responses WHERE respondent_id=($1) AND answer_options_id=($2)",
      [respondent_id, answer_options_id],
      (err, res) => {
        if (err) return next(err);
        if (res.rows.length === 0)
          return response.json({
            error: true,
            message: "There is no response found",
          });
        response.json(res.rows[0]);
      }
    );
  }
);

// POST http://www.brushup.com/quizzes/ID/respondents/ID/responses

router.post(
  "/:quizzes_id/respondents/:respondent_id/responses",
  (request, response, next) => {
    const { quizzes_id, email, secret } = request.body;

    pool.query(
      "INSERT INTO responses (quizzes_id,email, secret) VALUES ($1,$2,$3)",
      [quizzes_id, email, secret],
      (err, res) => {
        if (err) return next(err);
        response.redirect(`/quizzes/${quizzes_id}/respondents`);
      }
    );
  }
);
// PUT http://www.brushup.com/quizzes/ID/respondents/ID/responses/ID

router.put(
  "/:quizzes_id/respondents/:respondent_id",
  (request, response, next) => {
    const { quizzes_id, respondent_id } = request.params;
    const keys = ["email", "secret"];

    const fields = [];

    keys.forEach((key) => {
      if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
      pool.query(
        `UPDATE respondents SET ${field}=($1) WHERE quizzes_id=($2) AND id=($3)`,
        [request.body[field], quizzes_id, respondent_id],
        (err, res) => {
          if (err) return next(err);
          if (index === fields.length - 1)
            response.redirect(`/quizzes/${quizzes_id}/respondents`);
        }
      );
    });
  }
);
// DELETE http://www.brushup.com/quizzes/ID/respondents/ID/responses/ID

router.delete(
  "/:quizzes_id/respondents/:respondent_id",
  (request, response, next) => {
    const { quizzes_id, respondent_id } = request.params;
    pool.query(
      "DELETE FROM respondents WHERE quizzes_id=$1 AND id=$2",
      [quizzes_id, respondent_id],
      (err, res) => {
        if (err) return next(err);

        response.redirect(`/quizzes/${quizzes_id}/respondents`);
      }
    );
  }
);

module.exports = router;

const { Router } = require("express");
const pool = require("../db");
const router = Router();
const { generateSecrets } = require("./utils.js");
const jwt = require("jsonwebtoken");

//QUIZ ROUTES
router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM quizzes ORDER BY id ASC", (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

//UPDATED***
router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  const token = request.session.token;

  if (!token) {
    return response.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, "brushUp-secet-key", (err, decoded) => {
    if (err) {
      return response.status(401).send({
        message: "Unauthorized!",
      });
    }
    request.userId = decoded.id;

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
});

//UPDATED***
router.post("/", (request, response, next) => {
  const { creators_id, title } = request.body;
  const token = request.session.token;

  if (!token) {
    return response.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, "brushUp-secet-key", (err, decoded) => {
    if (err) {
      return response.status(401).send({
        message: "Unauthorized!",
      });
    }
    request.userId = decoded.id;

    pool.query(
      "INSERT INTO quizzes (creators_id,title) VALUES ($1,$2) RETURNING *",
      [creators_id, title],
      (err, res) => {
        if (err) return next(err);
        response.json(res.rows[0]);
      }
    );
  });
});

router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const { title } = request.body;

  const token = request.session.token;

  if (!token) {
    return response.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, "brushUp-secet-key", (err, decoded) => {
    if (err) {
      return response.status(401).send({
        message: "Unauthorized!",
      });
    }
    request.userId = decoded.id;

    pool.query(
      `UPDATE quizzes SET title=($1) WHERE id=($2) RETURNING *`,
      [title, id],
      (err, res) => {
        if (err) return next(err);
        response.json(res.rows[0]);
      }
    );
  });
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("DELETE FROM quizzes WHERE id=($1)", [id], (err, res) => {
    if (err) return next(err);

    response.status(204).end();
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
  const { question_text, image } = request.body;
  const { quizzes_id } = request.params;

  pool.query(
    "INSERT INTO questions (quizzes_id,question_text,image) VALUES ($1,$2,$3) RETURNING *",
    [quizzes_id, question_text, image],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows[0]);
    }
  );
});

router.put(
  "/:quizzes_id/questions/:questions_id",
  (request, response, next) => {
    const { quizzes_id, questions_id } = request.params;
    const { question_text, image } = request.body;

    pool.query(
      `UPDATE questions SET question_text=($1), image=($2) WHERE quizzes_id=($3) AND id=($4) RETURNING *`,
      [question_text, image, quizzes_id, questions_id],
      (err, res) => {
        if (err) return next(err);

        response.json(res.rows[0]);
      }
    );
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

        response.status(204).end(); // Status response
      }
    );
  }
);

//ANSWER_OPTIONS

router.get(
  "/:quizzes_id/questions/:questions_id/answer_options",
  (request, response, next) => {
    const { questions_id } = request.params;
    pool.query(
      "SELECT * FROM answer_options WHERE questions_id=($1) ORDER BY id ASC",
      [questions_id],
      (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
      }
    );
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
    const { correct, answer_text } = request.body;
    const { questions_id } = request.params;

    pool.query(
      "INSERT INTO answer_options(questions_id,correct, answer_text) VALUES ($1,$2,$3) RETURNING *",
      [questions_id, correct, answer_text],
      (err, res) => {
        if (err) return next(err);
        response.json(res.rows[0]);
      }
    );
  }
);

router.put(
  "/:quizzes_id/questions/:questions_id/answer_options/:id",
  (request, response, next) => {
    const { quizzes_id, questions_id, id } = request.params;
    const { correct, answer_text } = request.body;

    pool.query(
      `UPDATE answer_options SET correct=($1), answer_text=($2) WHERE questions_id=($3) AND id=($4) RETURNING *`,
      [correct, answer_text, questions_id, id],
      (err, res) => {
        if (err) return next(err);
        response.json(res.rows[0]);
      }
    );
  }
);

router.delete(
  "/:quizzes_id/questions/:questions_id/answer_options/:id",
  (request, response, next) => {
    const { questions_id, id } = request.params;
    pool.query(
      "DELETE FROM answer_options WHERE questions_id=($1) AND id=($2)",
      [questions_id, id],
      (err, res) => {
        if (err) return next(err);
        response.status(204).end();
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
  const { email } = request.body;
  const { quizzes_id } = request.params;
  const secret = generateSecrets();
  pool.query(
    "INSERT INTO respondents (quizzes_id,email, secret) VALUES ($1,$2,$3) RETURNING *",
    [quizzes_id, email, secret],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows[0]);
    }
  );
});

router.delete(
  "/:quizzes_id/respondents/:respondent_id",
  (request, response, next) => {
    const { quizzes_id, respondent_id } = request.params;
    pool.query(
      "DELETE FROM respondents WHERE quizzes_id=$1 AND id=$2",
      [quizzes_id, respondent_id],
      (err, res) => {
        if (err) return next(err);
        response.status(204).end();
      }
    );
  }
);

//RESPONSES

router.get("/:quizzes_id/responses", (request, response, next) => {
  const { quizzes_id } = request.params;

  pool.query(
    "SELECT * FROM responses WHERE quizzes_id=$1",
    [quizzes_id],
    (err, res) => {
      if (err) return next(err);
      if (res.rows.length === 0)
        return response.json({
          error: true,
          message: "There is no response found",
        });
      response.json(res.rows);
    }
  );
});

// POST http://www.brushup.com/quizzes/ID/respondents/ID/responses

router.post("/:quizzes_id/responses", (request, response, next) => {
  const { secret } = request.body;
  const { quizzes_id } = request.params;

  pool.query(
    "SELECT * FROM respondents WHERE quizzes_id=$1 AND secret=$2 ",
    [quizzes_id, secret],
    (err, res) => {
      if (err) return next(err);
      if (res.rows.length === 0)
        return response.json({
          error: true,
          message: "There is no match for quiz id and secret found",
        });

      if (res.rows.length >= 1) {
        const respondent = res.rows[0];
        pool.query(
          "INSERT INTO responses (respondent_id,quizzes_id) VALUES ($1,$2) RETURNING *",
          [respondent.id, quizzes_id],
          (err, res) => {
            if (err) return next(err);
            response.json(res.rows[0]);
          }
        );
      }
    }
  );
});

module.exports = router;

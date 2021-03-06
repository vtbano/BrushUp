CREATE TABLE creators (
  id SERIAL,
  username TEXT,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  password TEXT,
  PRIMARY KEY (id),
   UNIQUE (username,email)
);

CREATE TABLE quizzes (
  id SERIAL,
  creators_id INT,
  title TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (creators_id) REFERENCES creators(id)
);

CREATE TABLE questions (
  id SERIAL,
  quizzes_id INT,
  question_text TEXT,
  image TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (quizzes_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE answer_options (
  id SERIAL,
  questions_id INT,
  correct BOOLEAN,
  answer_text TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (questions_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE respondents (
  id SERIAL,
  quizzes_id INT,
  email TEXT,
  secret TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (quizzes_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE responses (
  id SERIAL,
  respondent_id INT,
  quizzes_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (respondent_id) REFERENCES respondents (id) ON DELETE CASCADE,
  FOREIGN KEY (quizzes_id) REFERENCES quizzes (id) ON DELETE CASCADE,
  UNIQUE (respondent_id,quizzes_id)
);


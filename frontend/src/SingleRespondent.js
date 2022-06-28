import React from "react";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./EditQuiz";
import { Link } from "react-router-dom";

const SingleRespondent = ({
  id,
  quizzes_id,
  email,
  secret,
  handleRespondentDelete,
}) => {
  return (
    <>
      <div className="single-respondent-row-container">
        <span className="single-quiz-title">{email}</span>
        <span>
          <button onClick={handleRespondentDelete}>x</button>
        </span>
        <span className="single-quiz-title">{secret}</span>
      </div>
    </>
  );
};

export default SingleRespondent;

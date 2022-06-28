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
  console.log("TITLE:", title, "QUIZ:", id);

  return (
    <>
      <div className="single-quiz-row-container">
        <span className="single-quiz-title">{email}</span>
        <span>
          <button onClick={handleRespondentDelete}>x</button>
        </span>
      </div>
    </>
  );
};

export default SingleRespondent;

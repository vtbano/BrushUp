import React from "react";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./EditQuiz";
import { Link } from "react-router-dom";

const SingleRespondent = ({ id, title, handleDelete }) => {
  // console.log("TITLE:", title, "QUIZ:", id);

  return (
    <>
      <div className="single-quiz-row-container">
        <span className="single-quiz-title">
          <Link to={`/quizzes/${id}/questions`}> {title}</Link>
        </span>
        <span>
          <DeleteQuiz handleDelete={handleDelete} />
          <EditQuiz id={id} />
        </span>
      </div>
    </>
  );
};

export default SingleRespondent;

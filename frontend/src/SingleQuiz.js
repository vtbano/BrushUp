import React from "react";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./EditQuiz";
import { Link } from "react-router-dom";

const SingleQuiz = ({ id, title, handleDelete }) => {
  return (
    <>
      <div className="single-quiz-row-container">
        <span className="single-quiz-title">
          <Link to={`/quizzes/${id}/questions`}> {title}</Link>
        </span>
        <span className="delete-and-edit-btn-container">
          <DeleteQuiz handleDelete={handleDelete} />
          <EditQuiz id={id} />
        </span>
      </div>
    </>
  );
};

export default SingleQuiz;

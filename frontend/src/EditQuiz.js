import React from "react";
import EditQuizTitle from "./EditQuizTitle";
import { Link } from "react-router-dom";

const EditQuiz = ({ id }) => {
  return (
    <>
      <Link to={`/quizzes/${id}/edit`}>
        <button className="btn-edit-quiz">Edit Title</button>
      </Link>
    </>
  );
};

export default EditQuiz;

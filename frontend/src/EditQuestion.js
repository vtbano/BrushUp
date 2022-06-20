import React from "react";
import { Link } from "react-router-dom";

const EditQuestion = ({ handleQuestionEdit, quizId, id }) => {
  return (
    <>
      <Link to={`/quizzes/${quizId}/questions/add/${id}`}>
        <button className="btn-edit-quiz" onClick={handleQuestionEdit}>
          Edit
        </button>
      </Link>
    </>
  );
};

export default EditQuestion;

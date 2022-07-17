import React from "react";

const DeleteCorrectAnswer = ({ handleCorrectAnswerDelete }) => {
  return (
    <>
      <button className="btn-delete-quiz" onClick={handleCorrectAnswerDelete}>
        Delete
      </button>
    </>
  );
};

export default DeleteCorrectAnswer;

import React from "react";

const DeleteWrongAnswer = ({ handleWrongAnswerDelete }) => {
  return (
    <>
      <button className="btn-delete-quiz" onClick={handleWrongAnswerDelete}>
        Delete
      </button>
    </>
  );
};

export default DeleteWrongAnswer;

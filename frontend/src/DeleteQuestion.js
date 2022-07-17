import React from "react";

const DeleteQuestion = ({ handleQuestionDelete }) => {
  return (
    <>
      <button className="btn-delete-quiz" onClick={handleQuestionDelete}>
        Delete
      </button>
    </>
  );
};

export default DeleteQuestion;

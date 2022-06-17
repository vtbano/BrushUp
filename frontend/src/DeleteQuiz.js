import React from "react";

const DeleteQuiz = ({ handleDelete }) => {
  return (
    <>
      <button className="btn-delete-quiz" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default DeleteQuiz;

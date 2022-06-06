import React from "react";

const DeleteQuiz = ({ handleDelete }) => {
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteQuiz;

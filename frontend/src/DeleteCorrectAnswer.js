import React from "react";

// "/:quizzes_id/questions/:questions_id/answer_options/:id"

const DeleteCorrectAnswer = ({ handleCorrectAnswerDelete }) => {
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleCorrectAnswerDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteCorrectAnswer;

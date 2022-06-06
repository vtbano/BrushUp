import React from "react";

// "/:quizzes_id/questions/:questions_id/answer_options/:id"

const DeleteWrongAnswer = ({ handleWrongAnswerDelete }) => {
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleWrongAnswerDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteWrongAnswer;

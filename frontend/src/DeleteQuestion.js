import React from "react";

//  "/:quizzes_id/questions/:questions_id"
const DeleteQuestion = ({ handleQuestionDelete }) => {
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleQuestionDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteQuestion;

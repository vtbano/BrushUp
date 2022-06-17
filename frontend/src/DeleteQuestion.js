import React from "react";

//  "/:quizzes_id/questions/:questions_id"
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

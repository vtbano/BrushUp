import React from "react";

//  "/:quizzes_id/questions/:questions_id"
const DeleteQuestion = ({ setQuestions, questions, quizId, DeleteId }) => {
  const handleQuestionDelete = async () => {
    const submitQuestionDelete = await fetch(
      `/quizzes/${quizId}/questions/${DeleteId}`,
      {
        method: "DELETE",
      }
    );
    const getUpdateQuestions = await submitQuestionDelete;
  };
  //the route does not redirect, must refresh to view new list
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleQuestionDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteQuestion;

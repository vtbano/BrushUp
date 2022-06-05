import React from "react";

//  "/:quizzes_id/questions/:questions_id"
const DeleteQuestion = ({
  setQuestions,
  questions,
  quizId,
  DeleteId,
  setShowQuizQuestions,
  setActiveContainer,
}) => {
  console.log("QuizID from DeleteQuestion", quizId);
  console.log("QuestionID from DeleteQuestion", DeleteId);
  const handleQuestionDelete = async () => {
    const submitQuestionDelete = await fetch(
      `/quizzes/${quizId}/questions/${DeleteId}`,
      {
        method: "DELETE",
      }
    );
    const getUpdateQuestions = await submitQuestionDelete;
    setActiveContainer("QuizQuestions");
    setShowQuizQuestions("DeleteQuestion");
  };
  //the route does not redirect, must refresh to view new list//how can i re-render the whole SingleQuestion component
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleQuestionDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteQuestion;

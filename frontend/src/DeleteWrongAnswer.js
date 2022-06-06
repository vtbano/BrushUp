import React from "react";

// "/:quizzes_id/questions/:questions_id/answer_options/:id"

const DeleteWrongAnswer = ({
  questions_id,
  deleteId,
  quizzes_id,
  setShowWrongAnswers,
}) => {
  // console.log("QuestionID from DeleteQuestion", questions_id);
  // console.log("AnswerOptionsID from DeleteQuestion", deleteId);
  // console.log("QuizzesID from DeleteQuestion", quizzes_id);
  const handleWrongAnswerDelete = async () => {
    const submitWrongAnswerDelete = await fetch(
      `quizzes/${quizzes_id}/questions/${questions_id}/answer_options/${deleteId}`,
      {
        method: "DELETE",
      }
    );
    const getUpdateWrongAnswer = await submitWrongAnswerDelete;
    setShowWrongAnswers("Delete Wrong Question");
  };
  //the route does not redirect, must refresh to view new list//how can i re-render the whole SingleQuestion component
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleWrongAnswerDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteWrongAnswer;

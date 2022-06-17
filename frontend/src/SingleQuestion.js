import React from "react";
import DeleteQuestion from "./DeleteQuestion";
import EditQuestion from "./EditQuestion";

const SingleQuestion = ({
  quizId,
  id,
  question_text,
  image,
  handleQuestionDelete,
  handleQuestionEdit,
}) => {
  console.log(
    "Question ID:",
    id,
    "Question Text:",
    question_text,
    "QUIZ:",
    quizId
  );

  return (
    <>
      <div className="single-question-row-container">
        <span className="single-question-title">{question_text}</span>
        <span>
          <DeleteQuestion handleQuestionDelete={handleQuestionDelete} />
          <EditQuestion handleQuestionEdit={handleQuestionEdit} />
        </span>
      </div>
    </>
  );
};

export default SingleQuestion;

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
  return (
    <>
      <div className="single-question-row-container">
        <span className="single-question-title">{question_text}</span>
        <span>
          <DeleteQuestion handleQuestionDelete={handleQuestionDelete} />
          <EditQuestion
            handleQuestionEdit={handleQuestionEdit}
            quizId={quizId}
            id={id}
          />
        </span>
      </div>
    </>
  );
};

export default SingleQuestion;

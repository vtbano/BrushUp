import React from "react";
import DeleteCorrectAnswer from "./DeleteCorrectAnswer";

const SingleCorrectAnswerOption = ({
  id,
  questions_id,
  correct,
  answer_text,
  handleCorrectAnswerDelete,
}) => {
  return (
    <>
      <div className="single-question-row-container">
        <span className="single-question-title">{answer_text}</span>
        <span>
          <DeleteCorrectAnswer
            handleCorrectAnswerDelete={handleCorrectAnswerDelete}
          />
        </span>
      </div>
    </>
  );
};

export default SingleCorrectAnswerOption;

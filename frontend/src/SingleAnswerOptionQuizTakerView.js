import React from "react";

const SingleAnswerOptionQuizTakerView = ({
  answerId,
  questions_id,
  correct,
  answer_text,
}) => {
  return (
    <>
      <div className="quiz-taker-answer-options-container">
        <span className="single-answer-option">{answer_text}</span>
      </div>
    </>
  );
};

export default SingleAnswerOptionQuizTakerView;

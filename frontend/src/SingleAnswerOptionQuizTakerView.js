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
        <div className="quiz-taker-single-answer-option">{answer_text}</div>
      </div>
    </>
  );
};

export default SingleAnswerOptionQuizTakerView;

import React, { useState } from "react";

const SingleAnswerOptionQuizTakerView = ({
  answerId,
  questions_id,
  correct,
  answer_text,
}) => {
  const [cssAnswerOption, setCssAnswerOption] = useState(
    "quiz-taker-single-answer-option"
  );
  const showAnswerSelectionResult = (correct) => {
    if (correct === true) {
      return setCssAnswerOption("quiz-taker-single-answer-option-true");
    } else if (correct === false) {
      return setCssAnswerOption("quiz-taker-single-answer-option-false");
    }
  };

  return (
    //make function for changing color on click and submitting as final
    <>
      <div className="quiz-taker-answer-options-container">
        <div
          className={cssAnswerOption}
          onClick={() => showAnswerSelectionResult(correct)}
        >
          {answer_text}
        </div>
      </div>
    </>
  );
};

export default SingleAnswerOptionQuizTakerView;

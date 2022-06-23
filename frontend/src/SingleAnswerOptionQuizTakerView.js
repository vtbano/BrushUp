import React, { useState } from "react";

const SingleAnswerOptionQuizTakerView = ({
  answerId,
  questions_id,
  correct,
  answer_text,
  optionSelectedCount,
  setOptionSelectedCount,
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
    <>
      <div className="quiz-taker-answer-options-container">
        <div
          className={cssAnswerOption}
          onClick={() => {
            showAnswerSelectionResult(correct);
            setOptionSelectedCount({
              ...optionSelectedCount,
              count: optionSelectedCount.count + 1,
            });
            console.log(optionSelectedCount);
          }}
        >
          {answer_text}
        </div>
      </div>
    </>
  );
};

export default SingleAnswerOptionQuizTakerView;

import React, { useState } from "react";

const SingleAnswerOptionQuizTakerView = ({
  correct,
  answer_text,
  optionSelectedCount,
  setOptionSelectedCount,
  showEndGameDislay,
  answerOptionsSelected,
  setAnswerOptionsSelected,
  disableAnswerOption,
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
            if (disableAnswerOption) {
              return;
            }

            showAnswerSelectionResult(correct);
            setOptionSelectedCount(optionSelectedCount + 1);
            setAnswerOptionsSelected([...answerOptionsSelected, correct]);
            showEndGameDislay();
          }}
        >
          {answer_text}
        </div>
      </div>
    </>
  );
};

export default SingleAnswerOptionQuizTakerView;

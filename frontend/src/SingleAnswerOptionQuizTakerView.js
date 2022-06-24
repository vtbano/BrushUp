import React, { useState } from "react";

const SingleAnswerOptionQuizTakerView = ({
  answerId,
  questions_id,
  correct,
  answer_text,
  optionSelectedCount,
  setOptionSelectedCount,
  showEndGameDislay,
  answerOptionsSelected,
  setAnswerOptionsSelected,
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
  // console.log(
  //   "see timely update of answerOptionsSelected Array",
  //   answerOptionsSelected
  // );
  return (
    <>
      <div className="quiz-taker-answer-options-container">
        <div
          className={cssAnswerOption}
          onClick={() => {
            showAnswerSelectionResult(correct);
            setOptionSelectedCount(optionSelectedCount + 1);
            console.log(optionSelectedCount);
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

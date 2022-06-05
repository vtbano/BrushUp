import React from "react";

const SingleCorrectAnswerOption = ({
  id,
  questions_id,
  correct,
  answer_text,
  setAnswerOptionsList,
  answerOptionsList,
}) => {
  // console.log(
  //   "Answer ID:",
  //   id,
  //   "Question ID:",
  //   questions_id,
  //   "correct:",
  //   correct,
  //   "AnswerText:",
  //   answer_text
  // );

  return (
    <React.Fragment>
      <div className="single-question-row-container">
        <span className="single-question-title">{answer_text}</span>
        <span>
          {/* <RemoveAnswer setAnswerOptionsList={setAnswerOptionsList}
                answerOptionsList={answerOptionsList} DeleteId={id} /> */}
        </span>
      </div>
    </React.Fragment>
  );
};

export default SingleCorrectAnswerOption;

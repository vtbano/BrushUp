import React from "react";
import DeleteWrongAnswer from "./DeleteWrongAnswer";

const SingleWrongAnswerOption = ({
  id,
  questions_id,
  quizzes_id,
  answer_text,
  handleWrongAnswerDelete,
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
    <>
      <div className="single-question-row-container">
        <span className="single-question-title">{answer_text}</span>
        <span>
          <DeleteWrongAnswer
            handleWrongAnswerDelete={handleWrongAnswerDelete}
          />
        </span>
      </div>
    </>
  );
};

export default SingleWrongAnswerOption;

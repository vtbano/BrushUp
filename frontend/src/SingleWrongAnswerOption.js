import React from "react";
import DeleteWrongAnswer from "./DeleteWrongAnswer";

const SingleWrongAnswerOption = ({
  id,
  questions_id,
  quizzes_id,
  answer_text,
  setShowWrongAnswers,
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
          <DeleteWrongAnswer
            questions_id={questions_id}
            deleteId={id}
            quizzes_id={quizzes_id}
            setShowWrongAnswers={setShowWrongAnswers}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

export default SingleWrongAnswerOption;

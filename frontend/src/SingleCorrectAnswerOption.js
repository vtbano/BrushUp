import React from "react";
import DeleteCorrectAnswer from "./DeleteCorrectAnswer";

const SingleCorrectAnswerOption = ({
  id,
  questions_id,
  quizzes_id,
  correct,
  answer_text,
  setShowCorrectAnswers,
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
          <DeleteCorrectAnswer
            questions_id={questions_id}
            deleteId={id}
            quizzes_id={quizzes_id}
            setShowCorrectAnswers={setShowCorrectAnswers}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

export default SingleCorrectAnswerOption;

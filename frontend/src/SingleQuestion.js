import React from "react";
import DeleteQuestion from "./DeleteQuestion";

const SingleQuestion = ({
  quizId,
  id,
  question_text,
  image,
  setActiveContainer,
  handleQuestionDelete,
}) => {
  console.log(
    "Question ID:",
    id,
    "Question Text:",
    question_text,
    "QUIZ:",
    quizId
  );

  return (
    <React.Fragment>
      <div className="single-question-row-container">
        <span className="single-question-title">{question_text}</span>
        <span>
          <DeleteQuestion handleQuestionDelete={handleQuestionDelete} />
          {/* <EditQuiz setQuizzes={setQuizzes} quizzes={quizzes} RemoveId={id} /> */}
        </span>
      </div>
    </React.Fragment>
  );
};

export default SingleQuestion;

import React from "react";

const SingleQuestion = ({
  quizId,
  id,
  question_text,
  image,
  setQuestions,
  questions,
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
          {/* <DeleteQuiz setQuizzes={setQuizzes} quizzes={quizzes} DeleteId={id} />
          <EditQuiz setQuizzes={setQuizzes} quizzes={quizzes} RemoveId={id} /> */}
        </span>
      </div>
    </React.Fragment>
  );
};

export default SingleQuestion;

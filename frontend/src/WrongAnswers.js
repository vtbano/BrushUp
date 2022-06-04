import React from "react";
// url route/:quizzes_id/questions/:questions_id/answer_options
const WrongAnswers = (quizzes_id, questionId) => {
  return (
    <React.Fragment>
      <div className="wrong-answer-options">
        <span className="single-quiz-title">{""}</span>
        <span>
          {/* <DeleteQuiz setQuizzes={setQuizzes} quizzes={quizzes} DeleteId={id} />
          <EditQuiz setQuizzes={setQuizzes} quizzes={quizzes} RemoveId={id} /> */}
        </span>
      </div>
    </React.Fragment>
  );
};

export default WrongAnswers;

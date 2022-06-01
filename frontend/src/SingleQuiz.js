import React from "react";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./EditQuiz";

const SingleQuiz = ({ id, creators_id, title, setQuizzes, quizzes }) => {
  console.log("TITLE:", title, "QUIZ:", id);

  return (
    <React.Fragment>
      <div className="single-quiz-row-container">
        <span className="single-quiz-title">{title}</span>
        <span>
          <DeleteQuiz setQuizzes={setQuizzes} quizzes={quizzes} DeleteId={id} />
          <EditQuiz setQuizzes={setQuizzes} quizzes={quizzes} RemoveId={id} />
        </span>
      </div>
    </React.Fragment>
  );
};

export default SingleQuiz;

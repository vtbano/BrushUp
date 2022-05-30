import React from "react";

const SingleQuiz = ({ id, creators_id, title, setQuizzes }) => {
  return (
    <React.Fragment>
      <div className="single-quiz-title">{title}</div>
    </React.Fragment>
  );
};

export default SingleQuiz;

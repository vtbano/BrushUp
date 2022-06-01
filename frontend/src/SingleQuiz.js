import React from "react";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./EditQuiz";

const SingleQuiz = ({ id, creators_id, title, setQuizzes }) => {
  return (
    <React.Fragment>
      <div className="single-quiz-title">
        {title}
        <span>
          <DeleteQuiz />
          <EditQuiz />
        </span>
      </div>
    </React.Fragment>
  );
};

export default SingleQuiz;

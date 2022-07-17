import React from "react";
import DeleteWrongAnswer from "./DeleteWrongAnswer";

const SingleWrongAnswerOption = ({ answer_text, handleWrongAnswerDelete }) => {
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

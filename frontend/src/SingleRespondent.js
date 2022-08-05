import React from "react";

const SingleRespondent = ({
  id,
  quizzes_id,
  email,
  secret,
  handleRespondentDelete,
}) => {
  return (
    <>
      <div className="single-respondent-row-container">
        <span className="single-quiz-title">
          {email}
          <button
            className="delete-respondent"
            onClick={handleRespondentDelete}
          >
            x
          </button>
        </span>

        <span className="single-url-link">
          https://brushup.netlify.app/quizzes/{quizzes_id}?secret={secret}
        </span>
      </div>
    </>
  );
};

export default SingleRespondent;

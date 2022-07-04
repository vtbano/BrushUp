import React, { useState, useEffect } from "react";

const SingleQuizWithResponse = ({ id, title, setQuizShared }) => {
  const [showTitle, setShowTitle] = useState(false);

  const getQuizResponsesComplete = async (id) => {
    const quizResponses = await fetch(`/quizzes/${id}/responses`);
    const resultOfQuizResponses = await quizResponses.json();
    console.log("SingleQuizWithResponse:", resultOfQuizResponses);
    if (resultOfQuizResponses.length >= 1) {
      setShowTitle(true);
    } else if (resultOfQuizResponses.length === 0) {
      setQuizShared(false);
    }
  };

  useEffect(() => {
    getQuizResponsesComplete();
  }, []);
  return (
    <>
      <div className="single-quiz-row-container">
        {showTitle ? <span className="single-quiz-title">{title}</span> : ""}
      </div>
    </>
  );
};

export default SingleQuizWithResponse;

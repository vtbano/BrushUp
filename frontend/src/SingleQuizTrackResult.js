import React, { useState, useEffect } from "react";

const SingleQuizTrackResult = ({ id, title }) => {
  const [numberOfRespondents, setNumberOfRespondents] = useState(0);
  const [numberOfResponses, setNumberOfResponses] = useState(0);
  const getNumberOfRespondents = async () => {
    const response = await fetch(`/quizzes/${id}/respondents`);
    const responseGetNumberOfRespondents = await response.json();
    setNumberOfRespondents(responseGetNumberOfRespondents.length);
  };

  const getQuizResponsesComplete = async () => {
    const quizResponses = await fetch(`/quizzes/${id}/responses`);
    const resultOfQuizResponses = await quizResponses.json();
    setNumberOfResponses(resultOfQuizResponses.length);
  };

  useEffect(() => {
    getNumberOfRespondents();
    getQuizResponsesComplete();
  }, []);
  return (
    <>
      <div className="track-result-row-container">
        {/* must be 1fr 1fr 1fr */}
        <div className="quizzes-sent-container">{title}</div>
        <div className="number-of-respondents-container">
          {numberOfRespondents}
        </div>
        <div className="completion">
          {numberOfResponses}/{numberOfRespondents}
        </div>
      </div>
    </>
  );
};

export default SingleQuizTrackResult;

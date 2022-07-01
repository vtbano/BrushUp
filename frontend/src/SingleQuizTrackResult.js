import React, { useState } from "react";

const SingleQuizTrackResult = ({ id, title }) => {
  const [numberOfRespondents, setNumberOfRespondents] = useState(0);
  const getNumberOfRespondents = async () => {
    const response = await fetch(`/quizzes/${id}/respondents`);
    const responseGetNumberOfRespondents = await response.json();
    setNumberOfRespondents(responseGetNumberOfRespondents.length);
  };

  useEffect(() => {
    getNumberOfRespondents();
  }, []);
  return (
    <>
      <div className="track-result-row-container">
        {/* must be 1fr 1fr 1fr */}
        <div className="quizzes-sent-container">{title}</div>
        <div className="number-of-respondents-container">
          {numberOfRespondents}
        </div>
        <div className="completion"></div>
      </div>
    </>
  );
};

export default SingleQuizTrackResult;

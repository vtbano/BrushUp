import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "./api/backendApi";

const SingleQuizTrackResult = ({ id, title, token }) => {
  const [numberOfRespondents, setNumberOfRespondents] = useState(0);
  const [numberOfResponses, setNumberOfResponses] = useState(0);

  const getNumberOfRespondents = async () => {
    const response = await fetch(`${baseUrl}/quizzes/${id}/respondents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const responseGetNumberOfRespondents = await response.json();
    setNumberOfRespondents(responseGetNumberOfRespondents.length);
  };

  const getQuizResponsesComplete = async () => {
    const quizResponses = await fetch(`${baseUrl}/quizzes/${id}/responses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
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
        <Link
          className="quizzes-sent-container"
          to={`/quizzes/${id}/questions`}
        >
          {title}
        </Link>
        <Link
          className="number-of-respondents-container"
          to={`/quizzes/${id}/share`}
        >
          {numberOfRespondents}
        </Link>
        <div className="completion">
          {numberOfResponses}/{numberOfRespondents}
        </div>
      </div>
    </>
  );
};

export default SingleQuizTrackResult;

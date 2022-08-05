import React, { useState, useEffect } from "react";
import baseUrl from "./api/backendApi";

const SingleQuizWithResponse = ({ id, title, setQuizShared, token }) => {
  const [showTitle, setShowTitle] = useState(false);

  const getQuizResponsesComplete = async () => {
    const quizResponses = await fetch(`${baseUrl}/quizzes/${id}/responses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const resultOfQuizResponses = await quizResponses.json();
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

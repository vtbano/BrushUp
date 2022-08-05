import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleQuizTrackResult from "./SingleQuizTrackResult";
import baseUrl from "./api/backendApi";

const TrackResults = ({ creator }) => {
  const { token } = creator;
  const { id } = useParams();
  const [trackResultQuizzes, setTrackResultQuizzes] = useState([]);

  const getQuizzes = async () => {
    const response = await fetch(`${baseUrl}/creators/${id}/quizzes`);
    const responseQuizzes = await response.json();
    setTrackResultQuizzes(responseQuizzes);

    console.log("All quizzes from specific Creator:", responseQuizzes);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <>
      <section className="add-respondent-sect">
        <div className="share-title-banner">Track Results</div>
        <div className="track-display">
          <div className="track-results-subtitle-container ">
            <span>Quizzes Sent</span>
            <span>Number of Respondents</span>
            <span>Completion</span>
          </div>
          {trackResultQuizzes.length >= 1 && (
            <div className="track-results-display">
              {trackResultQuizzes.map((quiz) => {
                return <SingleQuizTrackResult key={quiz.id} {...quiz} />;
              })}
            </div>
          )}
          {trackResultQuizzes.error === true && (
            <div className="no-quizzes-to-track">No quizzes to track</div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrackResults;

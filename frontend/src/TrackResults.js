import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TrackResults = (creator) => {
  const { id } = useParams();
  const [trackResultQuizzes, setTrackResultQuizzes] = useState([]);

  const getQuizzes = async () => {
    const response = await fetch(url);
    const responseQuizzes = await response.json();
    setQuizzes(responseQuizzes);

    console.log("All quizzes from specific Creator:", responseQuizzes);
  };

  // const getQuiz = async () => {
  //   const submitQuizId = await fetch(`/quizzes/${id}`);
  //   const responseGetQuiz = await submitQuizId.json();
  //   setQuizTitle(responseGetQuiz.title);
  // };

  useEffect(() => {
    getQuizzes();
  }, []);

  // useEffect(() => {
  //   getQuiz();
  //   getCurrentRespondents();
  // }, []);

  return (
    <>
      <section className="add-respondent-sect">
        <div className="share-title-banner">Track Results</div>
        <div className="share-display">
          <div className="track-results-subtitle-container ">
            <span>Quizzes Sent</span>
            <span>Number of Respondents</span>
            <span>Completion</span>
          </div>
          <div className="track-results-display">
            {/* {trackResultQuizzes.map((quiz) => {
                return <SingleQuizTrackResult key={quiz.id} {...quiz} />;
              })} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackResults;

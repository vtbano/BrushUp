import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";

const TrackResults = () => {
  const { id } = useParams();

  // const getCurrentRespondents = async () => {
  //   const response = await fetch(`/quizzes/${id}/respondents`);
  //   const responseGetCurrentRespondents = await response.json();
  //   setRespondentList(responseGetCurrentRespondents);
  // };

  // const getQuiz = async () => {
  //   const submitQuizId = await fetch(`/quizzes/${id}`);
  //   const responseGetQuiz = await submitQuizId.json();
  //   setQuizTitle(responseGetQuiz.title);
  // };

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
          {/* {respondentList.map((respondent) => {
            return (
              <SingleRespondent
                quizzes_id={id}
                key={respondent.id}
                {...respondent}
                handleRespondentDelete={() =>
                  handleRespondentDelete(respondent.id)
                }
              />
            );
          })} */}
        </div>
      </section>
    </>
  );
};

export default TrackResults;

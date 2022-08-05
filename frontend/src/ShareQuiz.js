import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleRespondent from "./SingleRespondent";
import baseUrl from "./api/backendApi";

const ShareQuiz = ({ creator }) => {
  const { token } = creator;
  const { id } = useParams();
  const [emailEntered, setEmailEntered] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [respondentList, setRespondentList] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const getCurrentRespondents = async () => {
    const response = await fetch(`${baseUrl}/quizzes/${id}/respondents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const responseGetCurrentRespondents = await response.json();
    setRespondentList(responseGetCurrentRespondents);
  };

  const getQuiz = async () => {
    const submitQuizId = await fetch(`${baseUrl}/quizzes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const responseGetQuiz = await submitQuizId.json();
    setQuizTitle(responseGetQuiz.title);
  };

  const checkSize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    getQuiz();
    getCurrentRespondents();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    //this will clean-up the useEffect
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  //HANDLE ADD RESPONDENT
  const handleAddRespondent = async (e) => {
    e.preventDefault();

    const submitRecipient = await fetch(
      `${baseUrl}/quizzes/${id}/respondents`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({
          quizzes_id: id,
          email: emailEntered,
        }),
      }
    );
    const getRecipientSubmitted = await submitRecipient.json();
    getCurrentRespondents();
    setEmailEntered("");
    console.log(getRecipientSubmitted);
  };

  //HANDLE DELETE RESPONDENT
  const handleRespondentDelete = async (respondentId) => {
    const submitRespondentDelete = await fetch(
      `${baseUrl}/quizzes/${id}/respondents/${respondentId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      }
    );
    console.log(submitRespondentDelete);
    await getCurrentRespondents();
  };

  return (
    <>
      <section className="add-respondent-sect">
        <div className="share-title-banner">
          SHARE
          <div className="share-display-quiz-title">{quizTitle}</div>
        </div>
        <div className="share-display">
          <div className="respondent-list-and-email-title-container ">
            <span>Add Respondent(s)</span>
            <span>{screenSize <= 500 ? "" : "Shareable Link"}</span>
          </div>
          {respondentList.map((respondent) => {
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
          })}

          <form>
            <input
              type="text"
              className="add-recipient-input"
              placeholder="Type Recipient Email"
              value={emailEntered}
              onChange={(e) => {
                setEmailEntered(e.target.value);
              }}
            />
          </form>
        </div>
        <button
          type="submit"
          className="btn-add-recipient"
          onClick={handleAddRespondent}
        >
          Add Recipient
        </button>
        <div className="share-link-container">
          <div className="share-general-link">
            If you would like to share the link to your quiz without tracking
            completion
            <div>
              <span>Share this link: </span>
              {`http://localhost:3001/quizzes/${id}`}
              {/* {`http://www.brushup.com/quizzes/${id}`} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShareQuiz;

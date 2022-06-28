import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleRespondent from "./SingleRespondent";

const ShareQuiz = () => {
  const { id } = useParams();
  const [emailEntered, setEmailEntered] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [respondentList, setRespondentList] = useState([]);
  // const navigate = useNavigate();

  const getCurrentRespondents = async () => {
    const response = await fetch(`/quizzes/${id}/respondents`);
    const responseGetCurrentRespondents = await response.json();
    setRespondentList(responseGetCurrentRespondents);
  };

  const getQuiz = async () => {
    const submitQuizId = await fetch(`/quizzes/${id}`);
    const responseGetQuiz = await submitQuizId.json();
    setQuizTitle(responseGetQuiz.title);
  };

  useEffect(() => {
    getQuiz();
    getCurrentRespondents();
  }, []);

  //HANDLE ADD RESPONDENT
  const handleAddRespondent = async (e) => {
    e.preventDefault();

    const submitRecipient = await fetch(`/quizzes/${id}/respondents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizzes_id: id,
        email: emailEntered,
      }),
    });
    const getRecipientSubmitted = await submitRecipient.json();
    getCurrentRespondents();
    setEmailEntered("");
    console.log(getRecipientSubmitted);
  };

  //HANDLE DELETE RESPONDENT
  const handleRespondentDelete = async (respondentId) => {
    const submitRespondentDelete = await fetch(
      `/quizzes/${id}/respondents/${respondentId}`,
      {
        method: "DELETE",
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
          {/* <div className="respondent-list-and-email-container "> */}
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
          {/* </div> */}
        </div>
        <button
          type="submit"
          className="btn-add-recipient"
          onClick={handleAddRespondent}
        >
          Add Recipient
        </button>
      </section>
    </>
  );
};

export default ShareQuiz;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShareQuiz = ({}) => {
  const { id } = useParams();
  const [emailEntered, setEmailEntered] = useState("");
  const navigate = useNavigate();

  const handleAddRecipient = async (e) => {
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
    console.log(getRecipientSubmitted);
  };

  return (
    <>
      <section className="add-recipient-sect">
        <div className="share-title-banner">
          SHARE
          <div className="share-display-quiz-title">Quiz Title ***</div>
        </div>
        <div className="recipient-list-and-email-display">
          <form>
            <input
              type="text"
              className="add-question-input"
              placeholder="Type Recipient Email"
              value={emailEntered}
              onChange={(e) => {
                setEmailEntered(e.target.value);
              }}
            />
          </form>
        </div>
        <div>
          <button
            type="submit"
            className="btn-add-recipient"
            onClick={handleAddRecipient}
          >
            Add Recipient
          </button>
        </div>
      </section>
    </>
  );
};

export default ShareQuiz;

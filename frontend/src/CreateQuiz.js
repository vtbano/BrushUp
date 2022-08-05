import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "./api/backendApi";

const CreateQuiz = ({ creator }) => {
  const { id, token } = creator;
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitQuiz = await fetch(`${baseUrl}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ creators_id: id, title: title }),
    });
    const getQuizSubmitted = await submitQuiz.json();
    console.log("Set Active Quiz ID:", getQuizSubmitted.id);
    navigate(`/quizzes/${getQuizSubmitted.id}/questions`);
  };

  return (
    <>
      <section className="create-quiz-sect">
        <div className="create-quiz-title">CREATE QUIZ</div>
        <div className="create-quiz-display">
          <span className="create-quiz-label">Quiz Title</span>
          <form>
            <input
              type="text"
              className="create-quiz-title-input"
              placeholder=" Enter Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>

          <button
            type="submit"
            className="btn-save-quiz"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </section>
    </>
  );
};

export default CreateQuiz;

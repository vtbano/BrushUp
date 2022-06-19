import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateQuiz = ({ creator, setActiveQuiz }) => {
  const { id } = creator;
  const [title, setTitle] = useState(""); //this causes to re-render and that's why console.log is coming up multiple times
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitQuiz = await fetch("/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creators_id: id, title: title }),
    });
    const getQuizSubmitted = await submitQuiz.json();
    console.log("Set Active Quiz:", getQuizSubmitted);
    setActiveQuiz(getQuizSubmitted);
    navigate(`/quizzes/${getQuizSubmitted.id}/questions`);
    console.log("New Quiz Added");
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

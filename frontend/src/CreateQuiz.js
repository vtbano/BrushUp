import React, { useEffect, useState } from "react";
import QuizQuestions from "./QuizQuestions";
const url = "/quizzes"; //MAKE POST METHOD

const CreateQuiz = ({ setQuizzes, setActiveContainer }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const quizTitle = { title }; //MUST ADD creaters_id
    fetch("/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizTitle),
    }).then(() => {
      console.log("New Quiz Added");
    });
  };

  return (
    <React.Fragment>
      <section className="create-quiz-sect">
        <div className="create-quiz-title">CREATE QUIZ</div>
        <div className="create-quiz-display">
          <span className="create-quiz-label">Quiz Title</span>
          <form onClick={handleSubmit}>
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
            onClick={
              (() => setActiveContainer("QuizQuestions"), (<QuizQuestions />))
            }
          >
            Save
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreateQuiz;

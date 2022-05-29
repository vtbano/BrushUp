import React, { useEffect, useState } from "react";
import QuizQuestions from "./QuizQuestions";
const url = "/quizzes"; //MAKE POST METHOD

const CreateQuiz = ({ setQuizzes, setActiveContainer }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const quizTitle = { title };
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
        <div className="create-quiz-container">
          <form onSubmit={handleSubmit}>
            <input type="text" required value={title} />
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

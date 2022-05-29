import React, { useEffect } from "react";
import QuizQuestions from "./QuizQuestions";
const url = "/quizzes"; //MAKE POST METHOD

const CreateQuiz = ({ setQuizzes, setActiveContainer }) => {
  const postQuizzes = async () => {
    const response = await fetch(url);
    const quizzes = await response.json();
    setQuizzes(quizzes);
    console.log(quizzes);
  };

  useEffect(() => {
    postQuizzes();
  }, []);

  return (
    <React.Fragment>
      <section className="create-quiz-sect">
        <div className="create-quiz-title">CREATE QUIZ</div>
        <div className="create-quiz-container">
          <button
            type="button"
            className="btn-save-quiz"
            onClick={() =>
              setActiveContainer("QuizQuestions")(<QuizQuestions />)
            }
          >
            +Create Quiz
          </button>
        </div>
      </section>
      <h3>getQuizzes</h3>
    </React.Fragment>
  );
};

export default CreateQuiz;

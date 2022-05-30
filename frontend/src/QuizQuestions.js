import React, { useState, useEffect } from "react";
const url = `quizzes/1`;

// const url = `creators/1/quizzes`; //use this URL for testing

const QuizQuestions = ({ setActiveContainer, quizzes, creator }) => {
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    const response = await fetch(url);
    const questions = await response.json();
    setQuestions(questions);
    console.log(questions);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <React.Fragment>
      <section className="quiz-shelf-sect">
        <div className="question-shelf-quiz-title">
          QUIZ TITLE
          <div className="question-count">#questions</div>
        </div>
        <div className="question-shelf-display">
          <div className="questions-container">
            <button
              type="button"
              className="btn-add-question"
              onClick={() => setActiveContainer("")}
            >
              +Add Question
            </button>
          </div>

          <div className="share-link-container">
            {/* when empty it display's a greyed out share img */}
            <img
              src="./img/icons8-ToShare-96 (1).png"
              alt="Share button"
              className="share-button"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default QuizQuestions;

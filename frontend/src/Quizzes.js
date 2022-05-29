import React, { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";
const url = `creators/1/quizzes`;

const Quizzes = ({ setActiveContainer }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [createQuizzes, setCreateQuizzes] = useState(false);

  const getQuizzes = async () => {
    const response = await fetch(url);
    const quizzes = await response.json();
    setQuizzes(quizzes);
    console.log(quizzes);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <React.Fragment>
      <section className="quiz-shelf-sect">
        <div className="creator-welcome">Ready to Brush Up **USERNAME**</div>
        <div className="quiz-shelf-title">QUIZ SHELF</div>
        <div className="quiz-shelf-display">
          <div className="quizzes-container-name">
            My Quizzes
            <div className="quizzes-container">
              <button
                type="button"
                className="btn-create-quiz"
                onClick={() => setActiveContainer("CreateQuiz")}
              >
                +Create Quiz
              </button>
            </div>
          </div>
          <div className="quizzes-container-name">
            Shared Quizzes
            <div className="quizzes-container">
              {/* when empty it display's a greyed out share img */}
              <img
                src="./img/icons8-noShareFade-96 (1).png"
                alt="Greyed-out share button"
                className="greyed-share-button"
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Quizzes;

import React, { useState, useEffect } from "react";
const url = `creators/1/quizzes`;

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

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
        <h3>Ready to Brush Up **USERNAME**</h3>
        <div className="quiz-shelf-title">QUIZ SHELF</div>
        <div className="quiz-shelf-display">
          <div className="quizzes-container-name">
            My Quizzes
            <div className="quizzes-container">
              <button className="btn-create-quiz">+Create Quiz</button>
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

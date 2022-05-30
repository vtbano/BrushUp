import React, { useState, useEffect } from "react";
import SingleQuiz from "./SingleQuiz";
const url = `creators/1/quizzes`;

const Quizzes = ({ setActiveContainer, setQuizzes, creator }) => {
  console.log("Quizzes Creator", creator);
  const { username } = creator;
  const [createQuizzes, setCreateQuizzes] = useState(false);
  const [getQuizResult, setGetQuizResult] = useState([]);
  setQuizzes(getQuizResult);

  const getQuizzes = async () => {
    const response = await fetch(url);
    const quizzes = await response.json();
    setGetQuizResult(quizzes);
    console.log(quizzes);
    console.log(creator);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <React.Fragment>
      <section className="quiz-shelf-sect">
        <div className="creator-welcome">Ready to Brush Up {username}</div>
        <div className="quiz-shelf-title">QUIZ SHELF</div>
        <div className="quiz-shelf-display">
          <div className="quizzes-container-name">
            My Quizzes
            <div className="quizzes-container">
              <div className="quizzes-single-quiz-container">
                {getQuizResult.map((quiz) => {
                  return <SingleQuiz key={quiz.id} {...quiz} />;
                })}
              </div>
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
            <div className="share-container">
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

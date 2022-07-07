import React, { useState, useEffect } from "react";
import SingleQuiz from "./SingleQuiz";
import SingleQuizWithResponse from "./SingleQuizWithResponse";
import { Link } from "react-router-dom";

const Quizzes = ({ creator }) => {
  const { id, username } = creator;
  const [quizzes, setQuizzes] = useState([]);
  const [quizShared, setQuizShared] = useState(false);

  const getQuizzes = async () => {
    const response = await fetch(`/creators/${id}/quizzes`);
    const responseQuizzes = await response.json();
    console.log("All quizzes from specific Creator:", responseQuizzes);
    if (responseQuizzes.length >= 1) {
      setQuizzes(responseQuizzes);
      setQuizShared(true);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const handleDelete = async (id) => {
    const submitQuizDelete = await fetch(`/quizzes/${id}`, {
      method: "DELETE",
    });
    console.log(submitQuizDelete);
    await getQuizzes();
  };

  return (
    <>
      <section className="quiz-shelf-sect">
        <div className="creator-welcome">Ready to Brush Up {username}</div>
        <div className="quiz-shelf-title">QUIZ SHELF</div>
        <div className="quiz-shelf-display">
          <div className="quizzes-container-name">
            My Quizzes
            <div className="quizzes-container">
              <div className="quizzes-single-quiz-container">
                {quizzes.map((quiz) => {
                  return (
                    <SingleQuiz
                      key={quiz.id}
                      {...quiz}
                      handleDelete={() => handleDelete(quiz.id)}
                    />
                  );
                })}
              </div>
              <Link to={`/quizzes/create`}>
                <button type="button" className="btn-create-quiz">
                  +Create Quiz
                </button>
              </Link>
            </div>
          </div>
          <div className="quizzes-container-name">
            Shared Quizzes
            <div className="share-container">
              {quizShared ? (
                <div className="quizzes-single-quiz-container">
                  {quizzes.map((quiz) => {
                    return <SingleQuizWithResponse key={quiz.id} {...quiz} />;
                  })}
                </div>
              ) : (
                <img
                  src="../img/icons8-noShareFade-96(1).png"
                  alt="Greyed-out share button"
                  className="greyed-share-button"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Quizzes;

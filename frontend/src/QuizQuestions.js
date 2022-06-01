import React, { useState, useEffect } from "react";
const url = `quizzes/1/quetions`; //but how do you know it's the latest quiz created

// const url = `creators/1/quizzes`; //use this URL for testing

const QuizQuestions = ({
  setActiveContainer,
  creator,
  id,
  creators_id,
  title,
}) => {
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    const response = await fetch(url);
    const activeQuestions = await response.json();
    setQuestions(activeQuestions);
    console.log(activeQuestions);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <React.Fragment>
      <section className="quiz-shelf-sect">
        <div className="question-shelf-quiz-title">
          {title}
          <div className="question-count">{questions.length}</div>
        </div>
        <div className="question-shelf-display">
          <div className="questions-container-name">
            My Questions
            <div className="questions-container">
              <div className="questions-single-question-container">
                {/* {quizzes.map((quiz) => {
                return (
                  <SingleQuestion
                    key={quiz.id}
                    {...quiz}
                    setQuizzes={setQuizzes}
                    quizzes={quizzes}
                  />
                );
              })} */}
              </div>
              <button
                type="button"
                className="btn-add-question"
                // onClick={() => setActiveContainer("")}
              >
                +Add Question
              </button>
            </div>
          </div>

          <div className="share-quiz-container">
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

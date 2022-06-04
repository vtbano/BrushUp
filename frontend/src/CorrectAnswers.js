import React, { useState, useEffect } from "react";

// url route /:quizzes_id/questions/:questions_id/answer_options
// const CorrectAnswers = ({ questionId, quizzes_id }) => {
const CorrectAnswers = ({ questionId, quizzes_id }) => {
  // console.log("questionID from CorrectAnswers", questionId);
  // console.log("quizzes_id from CorrectAnswers", quizzes_id);
  const [answerOptionsList, setanswerOptionsList] = useState([]);
  const getAnswerOptions = async () => {
    const response = await fetch(
      `quizzes/${quizzes_id}/questions/${questionId}/answer_options`
    );
    const responseAnswerOptions = await response.json();
    setanswerOptionsList(responseAnswerOptions);
    console.log(
      `All answers options from Quiz:${quizzes_id} & Question:${questionId}`,
      answerOptionsList
    );
  };

  useEffect(() => {
    getAnswerOptions();
  }, []);
  return (
    <React.Fragment>
      <div className="correct-answer-options">
        <span className="single-quiz-title">{""}</span>
        {/* <span>
          <DeleteQuiz setQuizzes={setQuizzes} quizzes={quizzes} DeleteId={id} />
          <EditQuiz setQuizzes={setQuizzes} quizzes={quizzes} RemoveId={id} />
        </span> */}
        <div className="correct-answer-option-input"></div>
        <div className="btn-container-correct-answer">
          <button
            type="button"
            className="btn-add-correct-answer"
            // onClick={() => setActiveContainer("CreateQuiz")}
          >
            +Add Correct Answer
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CorrectAnswers;

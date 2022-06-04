import React, { useState, useEffect } from "react";

// url route /:quizzes_id/questions/:questions_id/answer_options
const CorrectAnswers = (id, quizzes_id) => {
  const { questionId, quizId } = id;
  console.log("questionID from CorrectAnswers", questionId);
  console.log("quizzes_id from CorrectAnswers", quizId);
  const [answerOptionsList, setanswerOptionsList] = useState([]);
  const getAnswerOptions = async () => {
    const response = await fetch(
      `quizzes/${quizzes_id}/questions/${id}/answer_options`
    );
    const responseAnswerOptions = await response.json();
    setanswerOptionsList(responseAnswerOptions);
    console.log(
      `All answers options from Quiz:${quizzes_id} & Question:${id}`,
      responseAnswerOptions
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
      </div>
    </React.Fragment>
  );
};

export default CorrectAnswers;

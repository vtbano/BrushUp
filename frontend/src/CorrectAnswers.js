import React, { useState, useEffect } from "react";
import SingleCorrectAnswerOption from "./SingleCorrectAnswerOption";

// url route /:quizzes_id/questions/:questions_id/answer_options
const CorrectAnswers = ({ questionId, quizzes_id }) => {
  // console.log("questionID from CorrectAnswers", questionId);
  // console.log("quizzes_id from CorrectAnswers", quizzes_id);
  const [answerOptionsList, setanswerOptionsList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const getAnswerOptions = async () => {
    const response = await fetch(
      // `quizzes/${quizzes_id}/questions/${questionId}/answer_options`
      `quizzes/1/questions/1/answer_options`
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
        <span className="single-answer-option">
          {answerOptionsList.map((answer) => {
            return (
              <SingleCorrectAnswerOption
                key={answer.id}
                {...answer}
                setanswerOptionsList={setanswerOptionsList}
                answerOptionsList={answerOptionsList}
              />
            );
          })}
        </span>

        <div>
          {showInput ? (
            <div>
              <input
                type="text"
                className="correct-answer-option-input"
                placeholder="Insert correct answer option"
                // value={imageUrl}
                // onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="btn-container-correct-answer">
          <button
            type="button"
            className="btn-add-correct-answer"
            onClick={() => setShowInput(!showInput)}
          >
            +Add Correct Answer
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CorrectAnswers;

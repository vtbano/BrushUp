import React, { useState, useEffect } from "react";
import SingleCorrectAnswerOption from "./SingleCorrectAnswerOption";

const CorrectAnswers = ({
  questionId,
  quizzes_id,
  setActiveContainer,
  showCorrectAnswers,
  setShowCorrectAnswers,
}) => {
  const [answerOptionsList, setAnswerOptionsList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  //GET CALL
  const getAnswerOptions = async () => {
    const response = await fetch(
      // `quizzes/${quizzes_id}/questions/${questionId}/answer_options`
      `quizzes/1/questions/1/answer_options` //testing URL
    );
    const responseAnswerOptions = await response.json();
    setAnswerOptionsList(responseAnswerOptions);
    setShowCorrectAnswers("call getAnswerOptions Function");

    // console.log(
    //   `All answers options from Quiz:${quizzes_id} & Question:${questionId}`,
    //   answerOptionsList
    // );
  };

  useEffect(() => {
    getAnswerOptions();
  }, [showCorrectAnswers]);

  //HANDLE SUBMIT & POST METHOD

  const handleCorrectAnswerSubmit = async (e) => {
    e.preventDefault();
    const submitCorrectAnswer = await fetch(
      // `quizzes/${quizzes_id}/questions/${questionId}/answer_options`
      `quizzes/1/questions/1/answer_options`, //testing URL
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions_id: 1,
          correct: true,
          answer_text: correctAnswer,
        }),
      }
    );
    const getCorrectAnswerSubmitted = await submitCorrectAnswer.json();
    console.log("Set Active Correct Answers:", getCorrectAnswerSubmitted);
    setCorrectAnswer("");
    setShowCorrectAnswers("Add new correct answer option");
    setShowInput(!showInput);
    console.log("New Correct Answer Added");
  };

  return (
    <React.Fragment>
      <div className="correct-answer-options">
        <span className="single-answer-option">
          {answerOptionsList.map((answer) => {
            return (
              <SingleCorrectAnswerOption
                key={answer.id}
                {...answer}
                setAnswerOptionsList={setAnswerOptionsList}
                setShowCorrectAnswers={setShowCorrectAnswers}
                quizzes_id={quizzes_id}
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
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
              <button
                type="button"
                className="btn-enter-correct-answer"
                onClick={handleCorrectAnswerSubmit}
              >
                Enter
              </button>
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

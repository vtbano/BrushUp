import React, { useState, useEffect } from "react";
import SingleCorrectAnswerOption from "./SingleCorrectAnswerOption";
import baseUrl from "./api/backendApi";

const CorrectAnswers = ({ questionId, quizzes_id }) => {
  const [answerOptionsList, setAnswerOptionsList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  //GET CALL
  const getAnswerOptions = async () => {
    const response = await fetch(
      `${baseUrl}/quizzes/${quizzes_id}/questions/${questionId}/answer_options`
    );
    const responseAnswerOptions = await response.json();
    const onlyCorrectAnswers = responseAnswerOptions.filter(
      (answer) => answer.correct === true
    );
    setAnswerOptionsList(onlyCorrectAnswers);
  };

  useEffect(() => {
    getAnswerOptions();
  }, []);

  //HANDLE SUBMIT & POST METHOD

  const handleCorrectAnswerSubmit = async (e) => {
    e.preventDefault();
    const submitCorrectAnswer = await fetch(
      `${baseUrl}/quizzes/${quizzes_id}/questions/${questionId}/answer_options`,
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
    setShowInput(!showInput);
    getAnswerOptions();
    console.log("New Correct Answer Added");
  };

  //HANDLE DELETE

  const handleCorrectAnswerDelete = async (id) => {
    const submitCorrectAnswerDelete = await fetch(
      `${baseUrl}/quizzes/${quizzes_id}/questions/${questionId}/answer_options/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(submitCorrectAnswerDelete);
    await getAnswerOptions();
  };

  return (
    <>
      <div className="correct-answer-options">
        <span className="single-answer-option">
          {answerOptionsList.map((answer) => {
            return (
              <SingleCorrectAnswerOption
                key={answer.id}
                {...answer}
                handleCorrectAnswerDelete={() =>
                  handleCorrectAnswerDelete(answer.id)
                }
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
    </>
  );
};

export default CorrectAnswers;

import React, { useState, useEffect } from "react";
import SingleWrongAnswerOption from "./SingleWrongAnswerOption";
import baseUrl from "./api/backendApi";

const WrongAnswers = ({ questionId, quizzes_id }) => {
  const [wrongOptionsList, setWrongOptionsList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [wrongAnswers, setWrongAnswer] = useState("");

  //GET CALL
  const getWrongOptions = async () => {
    const response = await fetch(
      `${baseUrl}/quizzes/${quizzes_id}/questions/${questionId}/answer_options`
      // `quizzes/1/questions/1/answer_options` //testing URL
    );
    const responseAnswerOptions = await response.json();
    const onlyWrongAnswers = responseAnswerOptions.filter(
      (answer) => answer.correct === false
    );
    // console.log("WRONG ANSWERS ONLY:", onlyWrongAnswers);
    setWrongOptionsList(onlyWrongAnswers);
  };

  useEffect(() => {
    getWrongOptions();
  }, []);

  //HANDLE SUBMIT & POST METHOD

  const handleWrongAnswerSubmit = async (e) => {
    e.preventDefault();
    const submitWrongAnswer = await fetch(
      `${baseUrl}/quizzes/${quizzes_id}/questions/${questionId}/answer_options`,
      // `quizzes/1/questions/1/answer_options`, //testing URL
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions_id: 1,
          correct: false,
          answer_text: wrongAnswers,
        }),
      }
    );
    const getWrongAnswerSubmitted = await submitWrongAnswer.json();
    console.log("Set Active Wrong Answers:", getWrongAnswerSubmitted);
    setWrongAnswer("");
    setShowInput(!showInput);
    getWrongOptions();
    console.log("New Correct Answer Added");
  };

  //HANDLE DELETE

  const handleWrongAnswerDelete = async (id) => {
    const submitWrongAnswerDelete = await fetch(
      `${baseUrl}/quizzes/${quizzes_id}/questions/${questionId}/answer_options/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(submitWrongAnswerDelete);
    await getWrongOptions();
  };

  return (
    <>
      <div className="wrong-answer-options">
        <span className="single-answer-option">
          {wrongOptionsList.map((answer) => {
            return (
              <SingleWrongAnswerOption
                key={answer.id}
                {...answer}
                quizzes_id={quizzes_id}
                handleWrongAnswerDelete={() =>
                  handleWrongAnswerDelete(answer.id)
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
                className="wrong-answer-option-input"
                placeholder="Insert wrong answer option"
                value={wrongAnswers}
                onChange={(e) => setWrongAnswer(e.target.value)}
              />
              <button
                type="button"
                className="btn-enter-wrong-answer"
                onClick={handleWrongAnswerSubmit}
              >
                Enter
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="btn-container-wrong-answer">
          <button
            type="button"
            className="btn-add-wrong-answer"
            onClick={() => setShowInput(!showInput)}
          >
            +Add Wrong Answer
          </button>
        </div>
      </div>
    </>
  );
};

export default WrongAnswers;

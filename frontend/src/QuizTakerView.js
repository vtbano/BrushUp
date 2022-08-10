import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import SingleAnswerOptionQuizTakerView from "./SingleAnswerOptionQuizTakerView";
import baseUrl from "./api/backendApi";

const QuizTakerView = ({}) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState(null);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [correctOptionsCount, setCorrectOptionsCount] = useState(null);
  const [optionSelectedCount, setOptionSelectedCount] = useState(1);
  const [currentQuestionsIndex, setCurrentQuestionsIndex] = useState(0);
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
  const [endGame, setEndGame] = useState(false);
  const [answerOptionsSelected, setAnswerOptionsSelected] = useState([]);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);
  const [imageActive, setImageActive] = useState(false);
  const [disableAnswerOption, setDisableAnswerOption] = useState(false);

  const secret = searchParams.get("secret");

  const getCurrentQuizTitle = async () => {
    const response = await fetch(`${baseUrl}/quizzes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseGetCurrentQuizTitle = await response.json();
    setQuizTitle(responseGetCurrentQuizTitle.title);
  };

  const getQuestions = async () => {
    const response = await fetch(`${baseUrl}/quizzes/${id}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const activeQuizQuestions = await response.json();
    const activeQuizQuestionsSorted = activeQuizQuestions.sort(function(a, b) {
      return a.id - b.id;
    });
    setQuestions(activeQuizQuestionsSorted);
    setActiveQuestion(activeQuizQuestionsSorted[currentQuestionsIndex]);

    checkIfImageforQuestion(activeQuizQuestionsSorted[currentQuestionsIndex]);
  };

  const getAnswerOptions = async () => {
    const response = await fetch(
      `${baseUrl}/quizzes/${id}/questions/${activeQuestion.id}/answer_options`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const activeAnswerOptions = await response.json();
    if (activeAnswerOptions.length > 0) {
      setAnswerOptions(activeAnswerOptions);
      const correctOptions = activeAnswerOptions.filter((option) => {
        return option.correct === true;
      });
      setCorrectOptionsCount(correctOptions.length);
    } else if (activeAnswerOptions.length === 0) {
      setActiveQuestion(null);
      setOptionSelectedCount(1);
      setActiveQuestion(questions[currentQuestionsIndex + 1]);
      setCurrentQuestionsIndex(currentQuestionsIndex + 1);
      setCurrentQuestionNum(currentQuestionNum + 1);
    }
  };

  const addRespondent = async (secret) => {
    const submitRespondent = await fetch(`${baseUrl}/quizzes/${id}/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizzes_id: id,
        secret: secret,
      }),
    });
    const getRespondentSubmitted = await submitRespondent.json();
    console.log("Respondent Added:", getRespondentSubmitted);
  };

  useEffect(() => {
    getQuestions();
    getCurrentQuizTitle();
  }, []);

  useEffect(() => {
    if (activeQuestion !== null) getAnswerOptions();
  }, [activeQuestion]);

  useEffect(() => {
    if (answerOptionsSelected.length === 0) {
      setCountCorrectAnswers(0);
    } else if (answerOptionsSelected.length >= 1) {
      const resultOfAnswerOptionsSelected = answerOptionsSelected.every(
        (answer) => answer === true
      );
      if (resultOfAnswerOptionsSelected === true) {
        setCountCorrectAnswers(
          (oldCountCorrectAnswers) => oldCountCorrectAnswers + 1
        );
      }
    }
  }, [currentQuestionNum, endGame]);

  const checkIfImageforQuestion = (currentQuestion) => {
    if (currentQuestion.image !== "") {
      setImageActive(true);
      console.log("Current Image True", currentQuestion.image);
    } else if (currentQuestion.image === null) {
      setImageActive(false);
      console.log("Current Image False", currentQuestion.image);
    } else {
      setImageActive(false);
      console.log("Current Image False", currentQuestion.image);
    }
  };

  const goNextQuestion = (
    correctOptionsCount,
    optionSelectedCount,
    currentQuestionNum,
    questions
  ) => {
    if (
      correctOptionsCount === optionSelectedCount &&
      currentQuestionNum !== questions.length
    ) {
      setDisableAnswerOption(true);
      console.log("setDisableAnswerOption", disableAnswerOption);
      setTimeout(() => {
        setOptionSelectedCount(1);
        setActiveQuestion(questions[currentQuestionsIndex + 1]);
        checkIfImageforQuestion(questions[currentQuestionsIndex + 1]);
        setCurrentQuestionsIndex(
          (oldCurrentQuestionsIndex) => oldCurrentQuestionsIndex + 1
        );
        setCurrentQuestionNum(
          (oldCurrentQuestionNum) => oldCurrentQuestionNum + 1
        );
        setAnswerOptionsSelected([]);
        setDisableAnswerOption(false);
        console.log("setDisableAnswerOption to false", disableAnswerOption);
      }, 3000);
    } else if (
      correctOptionsCount === optionSelectedCount &&
      currentQuestionNum === questions.length
    ) {
      setDisableAnswerOption(true);
      console.log("setDisableAnswerOption", disableAnswerOption);
      showEndGameDislay();
    }
  };

  const showEndGameDislay = () => {
    setTimeout(() => {
      setEndGame(true);
      if (secret) {
        addRespondent(secret);
      }
    }, 3000);
  };

  return (
    <>
      <section className="quiz-taker-view-sect">
        <div className="quiz-taker-view-question-title">
          {quizTitle}
          <div className="questions-count">
            {currentQuestionNum}/{questions.length} questions
          </div>
        </div>
        {endGame ? (
          <div className="quiz-taker-view-end-game-display">
            <div className="quiz-takeer-view-final-score">
              {countCorrectAnswers}/{questions.length} Correct
            </div>
            <div className="share-general-link">
              Copy the link to
              <span> share </span>this quiz:
              <span> {`https://brushup.netlify.app/quizzes/${id}`}</span>
              {/* {`http://localhost:3001/quizzes/${id}`} */}
            </div>
          </div>
        ) : (
          <div className="quiz-taker-view-question-display">
            {imageActive ? (
              <img
                alt={activeQuestion !== null && activeQuestion.question_text}
                src={activeQuestion !== null && activeQuestion.image}
                className="quiz-taker-question-image"
              />
            ) : (
              <div></div>
            )}

            <div className="quiz-taker-view-question-label">Question:</div>
            <div className="quiz-taker-view-question">
              {activeQuestion !== null && activeQuestion.question_text}
            </div>
            <div className="quiz-taker-view-answer-options">
              {answerOptions.map((answer) => {
                return (
                  <SingleAnswerOptionQuizTakerView
                    answerId={id}
                    key={answer.id}
                    {...answer}
                    optionSelectedCount={optionSelectedCount}
                    setOptionSelectedCount={setOptionSelectedCount}
                    goNextQuestion={() =>
                      goNextQuestion(
                        correctOptionsCount,
                        optionSelectedCount,
                        currentQuestionNum,
                        questions
                      )
                    }
                    answerOptionsSelected={answerOptionsSelected}
                    setAnswerOptionsSelected={setAnswerOptionsSelected}
                    disableAnswerOption={disableAnswerOption}
                  />
                );
              })}
              {disableAnswerOption ? (
                <div>
                  You've made the maximum selections allowed for this question
                </div>
              ) : null}
            </div>
          </div>
        )}
        {/* //ADDITIONAL FEATURE TO BE ADDED 
        <div>
          <button type="submit" className="btn-save-question">
            Reveal Answers
          </button>
        </div> */}
      </section>
    </>
  );
};

export default QuizTakerView;

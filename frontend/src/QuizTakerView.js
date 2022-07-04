import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import SingleAnswerOptionQuizTakerView from "./SingleAnswerOptionQuizTakerView";

const QuizTakerView = ({}) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
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

  //*****/
  const secret = searchParams.get("secret");

  const getCurrentQuizTitle = async () => {
    const response = await fetch(`/quizzes/${id}`);
    const responseGetCurrentQuizTitle = await response.json();
    setQuizTitle(responseGetCurrentQuizTitle.title);
  };

  const getQuestions = async () => {
    const response = await fetch(`/quizzes/${id}/questions`);
    const activeQuizQuestions = await response.json();
    const activeQuizQuestionsSorted = activeQuizQuestions.sort(function(a, b) {
      return a.id - b.id;
    });
    setQuestions(activeQuizQuestionsSorted);
    setActiveQuestion(activeQuizQuestionsSorted[currentQuestionsIndex]);
    // console.log(
    //   "check if image:",
    //   activeQuizQuestionsSorted[currentQuestionsIndex].image
    // );
    checkIfImageforQuestion(activeQuizQuestionsSorted[currentQuestionsIndex]);
  };

  const getAnswerOptions = async () => {
    const response = await fetch(
      `/quizzes/${id}/questions/${activeQuestion.id}/answer_options`
    );
    const activeAnswerOptions = await response.json();
    if (activeAnswerOptions.length > 0) {
      // console.log("Active Answer Options:", activeAnswerOptions);
      setAnswerOptions(activeAnswerOptions);
      const correctOptions = activeAnswerOptions.filter((option) => {
        return option.correct === true;
      });
      setCorrectOptionsCount(correctOptions.length);
      // console.log("Correct Options", correctOptions.length);
    } else if (activeAnswerOptions.length === 0) {
      setActiveQuestion(null);
      setOptionSelectedCount(1);
      setActiveQuestion(questions[currentQuestionsIndex + 1]);
      setCurrentQuestionsIndex(currentQuestionsIndex + 1);
      setCurrentQuestionNum(currentQuestionNum + 1);
    }
  };

  const addRespondent = async (secret) => {
    const submitRespondent = await fetch(`/quizzes/${id}/responses`, {
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

  const goNextQuestion = (correctOptionsCount, optionSelectedCount) => {
    if (correctOptionsCount === optionSelectedCount) {
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
      }, 3000);
    }
  };

  const showEndGameDislay = (
    currentQuestionNum,
    questions,
    correctOptionsCount,
    optionSelectedCount
  ) => {
    if (currentQuestionNum === questions.length) {
      setTimeout(() => {
        setEndGame(true);
        if (secret) {
          addRespondent(secret);
        }
      }, 3000);
    } else {
      goNextQuestion(correctOptionsCount, optionSelectedCount);
    }
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
              <span> {`http://localhost:3001/quizzes/${id}`} </span>
              {/* {`http://www.brushup.com/quizzes/${id}`} */}
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
                    showEndGameDislay={() =>
                      showEndGameDislay(
                        currentQuestionNum,
                        questions,
                        correctOptionsCount,
                        optionSelectedCount
                      )
                    }
                    answerOptionsSelected={answerOptionsSelected}
                    setAnswerOptionsSelected={setAnswerOptionsSelected}
                  />
                );
              })}
            </div>
          </div>
        )}

        <div>
          <button type="submit" className="btn-save-question">
            Reveal Answers
          </button>
        </div>
      </section>
    </>
  );
};

export default QuizTakerView;

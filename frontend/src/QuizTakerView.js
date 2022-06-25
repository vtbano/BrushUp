import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleAnswerOptionQuizTakerView from "./SingleAnswerOptionQuizTakerView";

const QuizTakerView = ({}) => {
  const { id } = useParams();
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
  };

  const getAnswerOptions = async () => {
    const response = await fetch(
      `/quizzes/${id}/questions/${activeQuestion.id}/answer_options`
    );
    const activeAnswerOptions = await response.json();
    if (activeAnswerOptions.length > 0) {
      console.log("Active Answer Options:", activeAnswerOptions);
      setAnswerOptions(activeAnswerOptions);
      const correctOptions = activeAnswerOptions.filter((option) => {
        return option.correct === true;
      });
      setCorrectOptionsCount(correctOptions.length);
      console.log("Correct Options", correctOptions.length);
    } else if (activeAnswerOptions.length === 0) {
      setActiveQuestion(null);
      setOptionSelectedCount(1);
      setActiveQuestion(questions[currentQuestionsIndex + 1]);
      setCurrentQuestionsIndex(currentQuestionsIndex + 1);
      setCurrentQuestionNum(currentQuestionNum + 1);
    }
  };

  useEffect(() => {
    getQuestions();
    getCurrentQuizTitle();
  }, []);

  useEffect(() => {
    if (activeQuestion !== null) getAnswerOptions();
  }, [activeQuestion]);

  const filterAnswerOptions = (answerOptionsSelected) => {
    if (answerOptionsSelected.every((answer) => answer === true) === true) {
      setCountCorrectAnswers(countCorrectAnswers + 1);
      console.log("Count Correct Answers:", countCorrectAnswers);
    }
  };

  const goNextQuestion = (correctOptionsCount, optionSelectedCount) => {
    if (correctOptionsCount === optionSelectedCount) {
      setTimeout(() => {
        setOptionSelectedCount(1);
        setActiveQuestion(questions[currentQuestionsIndex + 1]);
        setCurrentQuestionsIndex(currentQuestionsIndex + 1);
        setCurrentQuestionNum(currentQuestionNum + 1);
        filterAnswerOptions(answerOptionsSelected);
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
        filterAnswerOptions(answerOptionsSelected);
        setEndGame(true);
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
          </div>
        ) : (
          <div className="quiz-taker-view-question-display">
            <img
              alt={activeQuestion !== null && activeQuestion.question_text}
              src={activeQuestion !== null && activeQuestion.image}
              className="quiz-taker-question-image"
            />
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

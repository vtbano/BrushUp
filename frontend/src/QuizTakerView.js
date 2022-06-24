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
  const [optionSelectedCount, setOptionSelectedCount] = useState({ count: 1 });
  const [currentQuestionsIndex, setCurrentQuestionsIndex] = useState({
    index: 0,
  });
  const [currentQuestionNum, setCurrentQuestionNum] = useState({
    question_number: 1,
  });

  const [endGame, setEndGame] = useState(false);

  const [answerOptionsSelected, setAnswerOptionsSelected] = useState([]);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState({
    correct_answers: 1,
  });

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
    setActiveQuestion(activeQuizQuestionsSorted[currentQuestionsIndex.index]);
    console.log("CurrentQuestionIndex", currentQuestionsIndex.index);
    // console.log("Actuve quiz questions **", activeQuizQuestions);
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
      setOptionSelectedCount({ count: 1 });
      setActiveQuestion(questions[currentQuestionsIndex.index + 1]);
      setCurrentQuestionsIndex({
        ...currentQuestionsIndex,
        index: currentQuestionsIndex.index + 1,
      });
      setCurrentQuestionNum({
        ...currentQuestionNum,
        question_number: currentQuestionNum.question_number + 1,
      });
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
    if (answerOptionsSelected.every((answer) => answer === true)) {
      setCountCorrectAnswers({
        ...countCorrectAnswers,
        correct_answers: countCorrectAnswers.correct_answers + 1,
      });
      console.log("Count Correct Answers:", countCorrectAnswers);
    }
  };

  const goNextQuestion = (correctOptionsCount, optionSelectedCount) => {
    if (correctOptionsCount === optionSelectedCount.count) {
      setTimeout(() => {
        setOptionSelectedCount({ count: 1 });
        setActiveQuestion(questions[currentQuestionsIndex.index + 1]);
        setCurrentQuestionsIndex({
          ...currentQuestionsIndex,
          index: currentQuestionsIndex.index + 1,
        });
        setCurrentQuestionNum({
          ...currentQuestionNum,
          question_number: currentQuestionNum.question_number + 1,
        });
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
    if (currentQuestionNum.question_number === questions.length) {
      setTimeout(() => {
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
            {currentQuestionNum.question_number}/{questions.length} questions
          </div>
        </div>
        {endGame ? (
          <div className="quiz-taker-view-end-game-display">
            {countCorrectAnswers.correct_answers}/{questions.length}
          </div>
        ) : (
          <div className="quiz-taker-view-question-display">
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

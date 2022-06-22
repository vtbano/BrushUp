import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleAnswerOptionQuizTakerView from "./SingleAnswerOptionQuizTakerView";

const QuizTakerView = ({}) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState(null);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  //make function goNextQuestion --this function should set the next question to be the next activeQuestion

  const getCurrentQuizTitle = async () => {
    const response = await fetch(`/quizzes/${id}`);
    const responseGetCurrentQuizTitle = await response.json();
    setQuizTitle(responseGetCurrentQuizTitle.title);
    console.log(responseGetCurrentQuizTitle.title);
  };

  const getQuestions = async () => {
    const response = await fetch(`/quizzes/${id}/questions`);
    const activeQuizQuestions = await response.json();
    const activeQuizQuestionsSorted = activeQuizQuestions.sort(function(a, b) {
      return a.id - b.id;
    });
    setQuestions(activeQuizQuestionsSorted);
    setActiveQuestion(activeQuizQuestionsSorted[0]);
    // console.log("Actuve quiz questions **", activeQuizQuestions);
  };

  const getAnswerOptions = async () => {
    const response = await fetch(
      `/quizzes/${id}/questions/${activeQuestion.id}/answer_options`
    );
    const activeAnswerOptions = await response.json();
    setAnswerOptions(activeAnswerOptions);
  };

  useEffect(() => {
    getQuestions();
    getCurrentQuizTitle();
  }, []);

  useEffect(() => {
    if (activeQuestion !== null) getAnswerOptions();
  }, [activeQuestion]);

  return (
    <>
      <section className="quiz-taker-view-sect">
        <div className="quiz-taker-view-question-title">
          {quizTitle}
          <div className="questions-count">{questions.length} questions</div>
        </div>
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
                />
              );
            })}
          </div>
        </div>

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

import React, { useState, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";

const QuizQuestions = ({
  setActiveContainer,
  activeQuiz,
  setActiveQuestion,
  setQuestionPlaceholder,
  setImagePlaceholder,
  setQuestionText,
  setImageUrl,
}) => {
  const { id, creators_id, title } = activeQuiz;
  const [questions, setQuestions] = useState([]);

  //GET
  const getQuestions = async () => {
    const response = await fetch(`quizzes/${id}/questions`);
    const activeQuizQuestions = await response.json();
    setQuestions(activeQuizQuestions);
    console.log(activeQuizQuestions);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  //HANDLE DELETE
  const handleQuestionDelete = async (questionId) => {
    const submitQuestionDelete = await fetch(
      `/quizzes/${id}/questions/${questionId}`,
      {
        method: "DELETE",
      }
    );
    console.log(submitQuestionDelete);
    await getQuestions();
  };

  //HANDLE SUBMIT
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const submitQuestion = await fetch(`/quizzes/${id}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizzes_id: id,
        question_text: null,
        image: null,
      }),
    });
    const getQuestionSubmitted = await submitQuestion.json();
    setActiveQuestion(getQuestionSubmitted);
    console.log("Set Active Question", getQuestionSubmitted);
    setActiveContainer("AddQuestion");
  };

  //HANDLE EDIT TO EACH QUESTION

  const handleQuestionEdit = async (questionId) => {
    const response = await fetch(`/quizzes/${id}/questions/${questionId}`);
    const responseGetQuestion = await response.json();
    setActiveQuestion(responseGetQuestion);
    setQuestionPlaceholder(responseGetQuestion.question_text);
    setImagePlaceholder(responseGetQuestion.image);
    setQuestionText(responseGetQuestion.question_text);
    setImageUrl(responseGetQuestion.image);
    console.log("Set Active Question", responseGetQuestion);
    setActiveContainer("AddQuestion");
  };

  return (
    <>
      <section className="quiz-shelf-sect">
        <div className="question-shelf-quiz-title">
          {title}
          <div className="questions-count">{questions.length} questions</div>
        </div>
        <div className="question-shelf-display">
          <div className="questions-container-name">
            My Questions
            <div className="questions-container">
              <div className="questions-single-question-container">
                {questions.map((question) => {
                  return (
                    <SingleQuestion
                      quizId={id}
                      key={question.id}
                      {...question}
                      handleQuestionDelete={() =>
                        handleQuestionDelete(question.id)
                      }
                      handleQuestionEdit={() => handleQuestionEdit(question.id)}
                    />
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="btn-add-question"
              onClick={handleQuestionSubmit}
            >
              +Add Question
            </button>
          </div>

          <div className="share-quiz-container">
            {/* when empty it display's a greyed out share img */}
            <img
              src="../img/icons8-ToShare-96 (1).png"
              alt="Share button"
              className="share-button"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizQuestions;

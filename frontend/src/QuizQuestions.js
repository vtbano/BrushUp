import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import SingleQuestion from "./SingleQuestion";
import baseUrl from "./api/backendApi";

const QuizQuestions = ({
  creator,
  setQuestionPlaceholder,
  setImagePlaceholder,
  setQuestionText,
  setImageUrl,
}) => {
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState(null);
  const { token } = creator;
  const { id } = useParams();
  const navigate = useNavigate();

  const getCurrentQuizTitle = async () => {
    const response = await fetch(`${baseUrl}/quizzes/${id}`);
    const responseGetCurrentQuizTitle = await response.json();
    setQuizTitle(responseGetCurrentQuizTitle.title);
    console.log(responseGetCurrentQuizTitle.title);
  };
  const getQuestions = async () => {
    const response = await fetch(`${baseUrl}/quizzes/${id}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const activeQuizQuestions = await response.json();
    const activeQuizQuestionsSorted = activeQuizQuestions.sort(function(a, b) {
      return a.id - b.id;
    });
    setQuestions(activeQuizQuestionsSorted);
    console.log(activeQuizQuestionsSorted);
  };

  useEffect(() => {
    getQuestions();
    getCurrentQuizTitle();
  }, []);

  //HANDLE DELETE
  const handleQuestionDelete = async (questionId) => {
    const submitQuestionDelete = await fetch(
      `${baseUrl}/quizzes/${id}/questions/${questionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    console.log(submitQuestionDelete);
    await getQuestions();
  };

  //HANDLE SUBMIT
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const submitQuestion = await fetch(`${baseUrl}/quizzes/${id}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        quizzes_id: id,
        question_text: null,
        image: null,
      }),
    });
    const getQuestionSubmitted = await submitQuestion.json();
    navigate(
      `/quizzes/${getQuestionSubmitted.quizzes_id}/questions/add/${getQuestionSubmitted.id}`
    );
  };

  //HANDLE EDIT TO EACH QUESTION

  const handleQuestionEdit = async (questionId) => {
    const response = await fetch(`/quizzes/${id}/questions/${questionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const responseGetQuestion = await response.json();
    setQuestionPlaceholder(responseGetQuestion.question_text);
    setImagePlaceholder(responseGetQuestion.image);
    setQuestionText(responseGetQuestion.question_text);
    setImageUrl(responseGetQuestion.image);
  };

  return (
    <>
      <section className="quiz-shelf-sect">
        <div className="question-shelf-quiz-title">
          {quizTitle}
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
            <div className="btn-create-question-container">
              <button
                type="button"
                className="btn-add-question"
                onClick={handleQuestionSubmit}
              >
                +Add Question
              </button>
            </div>
          </div>

          <div className="share-questions-container-center">
            {/* when empty it display's a greyed out share img */}
            <Link to={`/quizzes/${id}/share`}>
              <img
                src="../../img/icons8-clickToShare-96.png"
                alt="Share button"
                className="share-button"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizQuestions;

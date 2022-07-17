import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "./api/backendApi";

const EditQuizTitle = ({ setActiveQuiz }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateTitle, setUpdateTitle] = useState(""); //this causes to re-render and that's why console.log is coming up multiple times
  const [quizTitle, setQuizTitle] = useState(null);

  const getCurrentQuizTitle = async () => {
    const response = await fetch(`${baseUrl}/quizzes/${id}`);
    const responseGetCurrentQuizTitle = await response.json();
    setQuizTitle(responseGetCurrentQuizTitle.title);
    console.log(responseGetCurrentQuizTitle.title);
  };

  useEffect(() => {
    getCurrentQuizTitle();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    const submitQuizTitleEdit = await fetch(`${baseUrl}/quizzes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updateTitle }),
    });
    const getQuizTitleSubmitted = await submitQuizTitleEdit.json();

    navigate(`/quizzes`);
    console.log(`Quiz Title Updated to ${getQuizTitleSubmitted}`);
  };

  return (
    <>
      <section className="create-quiz-sect">
        <div className="edit-quiz-title">EDIT QUIZ TITLE</div>
        <div className="edit-quiz-display">
          <span className="edit-quiz-label">Current title is: {quizTitle}</span>
          <form>
            <input
              type="text"
              className="edit-quiz-title-input"
              placeholder=" Enter Quiz Title"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
          </form>

          <button
            type="submit"
            className="btn-update-quiz"
            onClick={handleEdit}
          >
            Update
          </button>
        </div>
      </section>
    </>
  );
};

export default EditQuizTitle;

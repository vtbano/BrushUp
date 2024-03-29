import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "./api/backendApi";

const EditQuizTitle = ({ creator }) => {
  const navigate = useNavigate();
  const { token } = creator;
  const { id } = useParams();
  const [updateTitle, setUpdateTitle] = useState("");
  const [quizTitle, setQuizTitle] = useState(null);

  const getCurrentQuizTitle = async () => {
    const response = await fetch(`${baseUrl}/quizzes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
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
      headers: { "Content-Type": "application/json", Authorization: token },
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

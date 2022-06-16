import React, { useState } from "react";

const EditQuizTitle = ({ setActiveContainer, activeQuiz, setActiveQuiz }) => {
  const { id, title } = activeQuiz;
  const [updateTitle, setUpdateTitle] = useState(""); //this causes to re-render and that's why console.log is coming up multiple times
  const handleEdit = async (e) => {
    e.preventDefault();

    const submitQuizTitleEdit = await fetch(`/quizzes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updateTitle }),
    });
    const getQuizTitleSubmitted = await submitQuizTitleEdit.json();
    setActiveQuiz("");
    console.log(`Quiz Title Updated to ${getQuizTitleSubmitted}`);
    setActiveContainer("Quizzes");
  };

  return (
    <React.Fragment>
      <section className="create-quiz-sect">
        <div className="edit-quiz-title">EDIT QUIZ TITLE</div>
        <div className="edit-quiz-display">
          <span className="edit-quiz-label">Current title is: {title}</span>
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
    </React.Fragment>
  );
};

export default EditQuizTitle;

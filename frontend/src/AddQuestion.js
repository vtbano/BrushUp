import React, { useEffect, useState } from "react";
const url = "/quizzes/:quizzes_id/questions"; //MAKE POST METHOD

const AddQuestion = ({ id, setActiveContainer, setActiveQuiz }) => {
  console.log("Quiz ID from Add Question", id);
  const [title, setTitle] = useState(""); //this causes to re-render and that's why console.log is coming up multiple times
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitQuiz = await fetch("/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creators_id: id, title: title }),
    });
    const getQuizSubmitted = await submitQuiz.json();
    console.log(getQuizSubmitted);
    setActiveQuiz(getQuizSubmitted);
    console.log("New Quiz Added");
    setActiveContainer("QuizQuestions");
  };

  return (
    <React.Fragment>
      <section className="create-quiz-sect">
        <div className="create-quiz-title">ADD QUESTION</div>
        <div className="create-quiz-display">
          <span className="create-quiz-label">Quiz Title</span>
          <form>
            <input
              type="text"
              className="create-quiz-title-input"
              placeholder=" Enter Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <button
            type="submit"
            className="btn-save-quiz"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddQuestion;

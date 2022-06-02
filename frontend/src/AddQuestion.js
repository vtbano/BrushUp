import React, { useEffect, useState } from "react";
const url = "/quizzes/:quizzes_id/questions"; //MAKE POST METHOD

const AddQuestion = ({ id, setActiveContainer, setActiveQuiz }) => {
  console.log("Quiz ID from Add Question", id);
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const submitQuiz = await fetch("/quizzes", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ creators_id: id, title: title }),
    // });
    // const getQuizSubmitted = await submitQuiz.json();
    // console.log(getQuizSubmitted);
    // setActiveQuiz(getQuizSubmitted);
    // console.log("New Quiz Added");
    // setActiveContainer("QuizQuestions");
  };

  return (
    <React.Fragment>
      <section className="add-question-sect">
        <div className="add-question-title ">ADD QUESTION</div>
        <div className="add-question-display">
          <form>
            <div className="add-question-label">Question</div>
            <input
              type="text"
              className="add-question-input"
              placeholder=" Example: Can dogs eat chocolate?"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />

            <div className="add-url-label">
              Optional - Add Question Image URL
            </div>
            <input
              type="text"
              className="add-question-input"
              placeholder=" Example: https://image.shutterstock.com/image-photo/siberian-huskies-on-beach-600w-213996883.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </form>
          {/* <button
            type="submit"
            className="btn-save-quiz"
            onClick={handleSubmit}
          >
            Save
          </button> */}
        </div>
        <button type="submit" className="btn-save-quiz" onClick={handleSubmit}>
          Save
        </button>
      </section>
    </React.Fragment>
  );
};

export default AddQuestion;

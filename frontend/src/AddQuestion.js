import React, { useState } from "react";

const AddQuestion = ({
  id,
  setActiveContainer,
  setActiveQuiz,
  activeQuestion,
}) => {
  console.log("Quiz ID from Add Question", id);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const submitQuestion = await fetch(`/quizzes/${id}/questions`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       quizzes_id: id,
  //       question_text: questionText,
  //       image: imageUrl,
  //     }),
  //   });
  //   const getQuestionSubmitted = await submitQuestion.json();
  //   console.log(getQuestionSubmitted);
  //   console.log("New Question Added");
  //   // setActiveContainer("");
  // };

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
              // value={questionText}
              // onChange={(e) => setQuestionText(e.target.value)}
            />

            <div className="add-url-label">
              Optional - Add Question Image URL
            </div>
            <input
              type="text"
              className="add-question-input"
              placeholder=" Example: https://image.shutterstock.com/image-photo/siberian-huskies-on-beach-600w-213996883.jpg"
              // value={imageUrl}
              // onChange={(e) => setImageUrl(e.target.value)}
            />
          </form>
        </div>
        <button
          type="submit"
          className="btn-Add-question-image"
          // onClick={handleSubmit}
        >
          ADD
        </button>
        {/* <button type="submit" className="btn-savePlusAdd-question">
          Save + Start Another
        </button> */}
      </section>
    </React.Fragment>
  );
};

export default AddQuestion;

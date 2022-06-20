import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CorrectAnswers from "./CorrectAnswers";
import WrongAnswers from "./WrongAnswers";

const AddQuestion = ({
  // setActiveContainer,
  // id,
  // quizzes_id,
  questionPlaceholder,
  imagePlaceholder,
  setImagePlaceholder,
  questionText,
  setQuestionPlaceholder,
  setQuestionText,
  imageUrl,
  setImageUrl,
}) => {
  const { id, questionId } = useParams();
  const navigate = useNavigate();

  const handleQuestionSave = async (e) => {
    e.preventDefault();

    const submitQuestion = await fetch(
      `/quizzes/${id}/questions/${questionId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizzes_id: id,
          question_text: questionText,
          image: imageUrl,
        }),
      }
    );
    const getQuestionSubmitted = await submitQuestion.json();
    console.log(getQuestionSubmitted);
    console.log("New Question Saved");
    console.log(
      "setQuestionPlaceholder in ADDQUESTION",
      setQuestionPlaceholder(" Example: Can dogs eat chocolate?")
    );
    setQuestionText("");
    setImagePlaceholder(" Copy image address here!");
    setImageUrl("");
    navigate(`/quizzes/${id}/questions`);
  };

  return (
    <>
      <section className="add-question-sect">
        <div className="add-question-title ">ADD QUESTION</div>
        <div className="add-question-display">
          <form>
            <div className="add-question-label">Question</div>
            <input
              type="text"
              className="add-question-input"
              placeholder={questionPlaceholder}
              value={questionText}
              onChange={(e) => {
                setQuestionText(e.target.value);
              }}
            />

            <div className="add-url-label">
              Optional - Add Question Image URL
            </div>
            <input
              type="text"
              className="add-question-input"
              placeholder={imagePlaceholder}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </form>
          <div className="answer-options-display">
            <div className="correct-answers-container">
              Correct Answers
              <CorrectAnswers questionId={questionId} quizzes_id={id} />
            </div>
            <div className="wrong-answers-container">
              Wrong Answers
              <WrongAnswers questionId={questionId} quizzes_id={id} />
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="btn-save-question"
            onClick={handleQuestionSave}
          >
            Save
          </button>
          {/* <button type="submit" className="btn-savePlusAdd-question">
            Save + Start Another
          </button> */}
        </div>
      </section>
    </>
  );
};

export default AddQuestion;

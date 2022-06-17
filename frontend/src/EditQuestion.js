import React from "react";

const EditQuestion = ({ handleQuestionEdit }) => {
  return (
    <>
      <button className="btn-edit-quiz" onClick={handleQuestionEdit}>
        Edit
      </button>
    </>
  );
};

export default EditQuestion;

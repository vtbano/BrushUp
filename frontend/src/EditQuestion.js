import React from "react";

const EditQuestion = ({ handleQuestionEdit }) => {
  return (
    <React.Fragment>
      <button className="btn-edit-quiz" onClick={handleQuestionEdit}>
        Edit
      </button>
    </React.Fragment>
  );
};

export default EditQuestion;

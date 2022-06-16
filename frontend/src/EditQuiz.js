import React from "react";
import EditQuizTitle from "./EditQuizTitle";

const EditQuiz = ({ handleEditQuizTitle }) => {
  return (
    <React.Fragment>
      <button className="btn-edit-quiz" onClick={handleEditQuizTitle}>
        Edit Title
      </button>
    </React.Fragment>
  );
};

export default EditQuiz;

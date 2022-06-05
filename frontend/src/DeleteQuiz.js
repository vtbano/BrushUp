import React from "react";

const DeleteQuiz = ({
  setQuizzes,
  quizzes,
  DeleteId,
  setShowQuizzes,
  setActiveContainer,
}) => {
  // console.log("Delete ID", DeleteId);
  const handleDelete = async () => {
    const submitQuizDelete = await fetch(`/quizzes/${DeleteId}`, {
      method: "DELETE",
    });
    const getUpdateQuizzes = await submitQuizDelete;
    setShowQuizzes("DeleteQuiz");
    setActiveContainer("Quizzes");
    console.log("List of Quizzes after delete request", getUpdateQuizzes);
  };
  //the route does not redirect, must refresh to view new list
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteQuiz;

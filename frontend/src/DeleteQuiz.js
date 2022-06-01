import React from "react";

const DeleteQuiz = ({ setQuizzes, quizzes, DeleteId }) => {
  console.log("Delete ID", DeleteId);
  const handleDelete = async () => {
    const submitQuizDelete = await fetch(`/quizzes/${DeleteId}`, {
      method: "DELETE",
    });
    const getUpdateQuizzes = await submitQuizDelete;
    console.log(getUpdateQuizzes);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { id, username } = creator;
  //   const submitQuiz = await fetch("/quizzes", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ creators_id: id, title: title }),
  //   });
  // };
  return (
    <React.Fragment>
      <button className="btn-delete-quiz" onClick={handleDelete}>
        Delete
      </button>
    </React.Fragment>
  );
};

export default DeleteQuiz;

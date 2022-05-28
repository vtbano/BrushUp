import React, { useState, useEffect } from "react";
const url = "/quizzes"; //MAKE POST METHOD

const CreateQuiz = (setQuizzes) => {
  const postQuizzes = async () => {
    const response = await fetch(url);
    const quizzes = await response.json();
    setQuizzes(quizzes);
    console.log(quizzes);
  };

  useEffect(() => {
    postQuizzes();
  }, []);

  return (
    <React.Fragment>
      <h3>getQuizzes</h3>
    </React.Fragment>
  );
};

export default CreateQuiz;

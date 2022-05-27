import React, { useState, useEffect } from "react";
const url = "http://localhost:3000/quizzes";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    const response = await fetch(url);
    const quizzes = await response.json();
    setQuizzes(quizzes);
    console.log(quizzes);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <React.Fragment>
      <h3>getQuizzes</h3>
    </React.Fragment>
  );
};

export default Quizzes;

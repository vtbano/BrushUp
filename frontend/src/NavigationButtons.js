import React, { useState, useEffect } from "react";

const NavigationButtons = ({ setActiveContainer, creator }) => {
  const { id, username } = creator;
  const url = `creators/1/quizzes`; //set for testing- DONT Change until Create Login is setup
  const [quizzes, setQuizzes] = useState([]);
  const [showQuizzes, setShowQuizzes] = useState("");

  const handleReturnToQuizzes = async () => {
    const response = await fetch(url);
    const responseQuizzes = await response.json();
    setQuizzes(responseQuizzes);
    setShowQuizzes("Return to Quizzes.js");
    setActiveContainer("Quizzes");
    console.log("Return to quizzes");
  };

  useEffect(() => {
    handleReturnToQuizzes();
  }, [showQuizzes]);

  return (
    <span className="navigation-buttons">
      <img
        src="./img/icons8-book-shelf-96.png"
        alt="Quiz Shelf Button"
        className="nav-button"
        onClick={handleReturnToQuizzes}
      />
      <img
        src="./img/icons8-progresspie--96.png"
        alt="Progress Navigation Button"
        className="nav-button"
        onClick={() => {
          //
        }}
      />
      <img
        src="./img/icons8-user-96.png"
        alt="move history button"
        className="nav-button"
        onClick={() => {
          //
        }}
      />
    </span>
  );
};
export default NavigationButtons;

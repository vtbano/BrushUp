import React from "react";

const NavigationButtons = ({ setActiveContainer, creator }) => {
  return (
    <span className="navigation-buttons">
      <img
        src="./img/icons8-book-shelf-96.png"
        alt="Quiz Shelf Button"
        className="nav-button"
        onClick={() => {
          setActiveContainer("Quizzes");
        }}
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

import React from "react";
import { Link } from "react-router-dom";

const NavigationButtons = ({ creator }) => {
  return (
    <span className="navigation-buttons">
      <Link to={`/quizzes`}>
        <img
          src="../img/icons8-book-shelf-96.png"
          alt="Quiz Shelf Button"
          className="nav-button"
        />
      </Link>
      <img
        src="../img/icons8-progresspie--96.png"
        alt="Progress Navigation Button"
        className="nav-button"
      />
      <img
        src="../img/icons8-user-96.png"
        alt="move history button"
        className="nav-button"
      />
    </span>
  );
};
export default NavigationButtons;

import React from "react";
import { Link } from "react-router-dom";

const NavigationButtons = ({ creator, userNavBar }) => {
  return (
    <>
      {userNavBar ? (
        <span className="navigation-buttons">
          <Link to={`/quizzes`}>
            <img
              src="../img/icons8-book-shelf-96.png"
              alt="Quiz Shelf Button"
              className="nav-button"
            />
          </Link>
          <Link to={`creator/${creator.id}/responses`}>
            <img
              src="../img/icons8-progresspie--96.png"
              alt="Progress Navigation Button"
              className="nav-button"
            />
          </Link>
          <img
            src="../img/icons8-user-96.png"
            alt="move history button"
            className="nav-button"
          />
        </span>
      ) : (
        <span className="navigation-buttons">
          <Link to={`/login`}>
            <button>LOGIN</button>
          </Link>
          <Link to={`/register`}>
            <button>GET STARTED</button>
          </Link>
        </span>
      )}
    </>
  );
};
export default NavigationButtons;

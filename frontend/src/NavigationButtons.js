import React from "react";
import { Link } from "react-router-dom";

const NavigationButtons = ({ creator, userNavBar }) => {
  // const handleSignout = async (e) => {
  //   e.preventDefault();

  //   const submitSignOutRequest = await fetch("/creators/signout", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const getSignOutRequestResponse = await submitSignOutRequest.json();
  //   console.log("Signout Response:", getSignOutRequestResponse);
  //   navigate(``);
  // };
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
            alt="Profilebutton"
            className="nav-button"
          />
          <Link to={``}>
            <img
              src="../img/icons8-sign-out-100.png"
              alt="Profilebutton"
              className="nav-button"
              // onClick={()=> handleSignout}
            />
          </Link>
        </span>
      ) : (
        <span className="login-register-navigation-buttons">
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setCreator, setUserNavBar }) => {
  const [userEntered, setUserEntered] = useState("");
  const [userPasswordEntered, setUserPasswordEntered] = useState("");
  const [checkInput, setCheckInput] = useState(true);
  const navigate = useNavigate();

  // HANDLE USER CHECK
  const handleUserCheck = async (e) => {
    e.preventDefault();

    const submitUser = await fetch(`/creators/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userEntered,
        password: userPasswordEntered,
      }),
    });
    const getUserSubmitted = await submitUser.json();
    if (getUserSubmitted.message === "Invalid Password!") {
      console.log("Invalid Password!");
      setCheckInput(false);
    } else {
      setCreator(getUserSubmitted);
      setUserNavBar(true);
      navigate("/quizzes");
      setUserEntered("");
      setUserPasswordEntered("");
      console.log(getUserSubmitted);
    }
  };

  return (
    <>
      <section className="add-respondent-sect">
        <div className="login-and-register-banner">LOGIN</div>
        <div className="login-and-register-display">
          <div className="login-form">
            <form>
              <div className="form-sections">
                <span className="login-and-register-form-title">Username</span>
                <input
                  type="text"
                  className={
                    checkInput
                      ? "login-and-register-form-input"
                      : "login-and-register-form-input-wrong"
                  }
                  placeholder="Type username"
                  value={userEntered}
                  onChange={(e) => {
                    setUserEntered(e.target.value);
                  }}
                />
              </div>
              <div className="form-sections">
                <span className="login-and-register-form-title">Password</span>
                <input
                  type="password"
                  className={
                    checkInput
                      ? "login-and-register-form-input"
                      : "login-and-register-form-input-wrong"
                  }
                  placeholder="Type password"
                  value={userPasswordEntered}
                  onChange={(e) => {
                    setUserPasswordEntered(e.target.value);
                  }}
                />
              </div>
            </form>
            <div>{checkInput ? "" : "Please check username and password"}</div>
            <button
              type="submit"
              className="btn-login"
              onClick={handleUserCheck}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

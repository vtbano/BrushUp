import React, { useState, useEffect } from "react";

const Login = () => {
  const [userEntered, setUserEntered] = useState("");
  const [userPasswordEntered, setUserPasswordEntered] = useState("");

  // const getCurrentRespondents = async () => {
  //   const response = await fetch(`/quizzes/${id}/respondents`);
  //   const responseGetCurrentRespondents = await response.json();
  //   setRespondentList(responseGetCurrentRespondents);
  // };

  // const getQuiz = async () => {
  //   const submitQuizId = await fetch(`/quizzes/${id}`);
  //   const responseGetQuiz = await submitQuizId.json();
  //   setQuizTitle(responseGetQuiz.title);
  // };

  // useEffect(() => {
  //   getQuiz();
  //   getCurrentRespondents();
  // }, []);

  //HANDLE USER CHECK
  const handleUserCheck = async (e) => {
    e.preventDefault();

    const submitRecipient = await fetch(`/quizzes/${id}/respondents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizzes_id: id,
        email: emailEntered,
      }),
    });
    const getRecipientSubmitted = await submitRecipient.json();
    getCurrentRespondents();
    setEmailEntered("");
    console.log(getRecipientSubmitted);
  };

  return (
    <>
      <section className="add-respondent-sect">
        <div className="login-and-register-banner">LOGIN</div>
        <div className="login-and-register-display">
          <div className="google-sign-in-container ">GOOGLE LOGIN</div>
          <div className="or-divider">OR</div>
          <div className="login-form">
            <form>
              <div>
                <span className="login-and-register-form-title">Username</span>
                <input
                  type="text"
                  className="login-and-register-form-input"
                  placeholder="Type email"
                  value={userEntered}
                  onChange={(e) => {
                    setUserEntered(e.target.value);
                  }}
                />
              </div>
              <div>
                <span className="login-and-register-form-title">Password</span>
                <input
                  type="text"
                  className="login-and-register-form-input"
                  placeholder="Type password"
                  value={userPasswordEntered}
                  onChange={(e) => {
                    setUserPasswordEntered(e.target.value);
                  }}
                />
              </div>
            </form>
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

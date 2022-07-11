import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setCreator, setUserNavBar }) => {
  const navigate = useNavigate();
  const [userEntered, setUserEntered] = useState("");
  const [userEmailEntered, setUserEmailEntered] = useState("");
  const [userFirstNameEntered, setUserFirstNameEntered] = useState("");
  const [userLastNameEntered, setUserLastNameEntered] = useState("");
  const [userPasswordEntered, setUserPasswordEntered] = useState("");

  //HANDLE USER REGISTER
  const handleUserRegister = async (e) => {
    e.preventDefault();

    const submitNewUser = await fetch(`/creators`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userEntered,
        email: userEmailEntered,
        first_name: userFirstNameEntered,
        last_name: userLastNameEntered,
        password: userPasswordEntered,
      }),
    });
    const getUserSubmitted = await submitNewUser.json();
    console.log(getUserSubmitted);
    setCreator(getUserSubmitted);
    setUserNavBar(true);
    setUserEntered("");
    setUserEmailEntered("");
    setUserFirstNameEntered("");
    setUserLastNameEntered("");
    setUserPasswordEntered("");

    navigate(`/quizzes`);
  };

  return (
    <>
      <section className="add-respondent-sect">
        <div className="login-and-register-banner">REGISTER</div>
        <div className="login-and-register-display">
          <div className="login-form">
            <form>
              <div className="form-sections">
                <span className="login-and-register-form-title">Username</span>
                <input
                  type="text"
                  className="login-and-register-form-input"
                  placeholder="Type Username"
                  value={userEntered}
                  onChange={(e) => {
                    setUserEntered(e.target.value);
                  }}
                />
              </div>
              <div className="form-sections">
                <span className="login-and-register-form-title">
                  User Email
                </span>
                <input
                  type="email"
                  className="login-and-register-form-input"
                  placeholder="Type Email"
                  value={userEmailEntered}
                  onChange={(e) => {
                    setUserEmailEntered(e.target.value);
                  }}
                />
              </div>
              <div className="form-sections">
                <span className="login-and-register-form-title">
                  First Name
                </span>
                <input
                  type="text"
                  className="login-and-register-form-input"
                  placeholder="Type First Name"
                  value={userFirstNameEntered}
                  onChange={(e) => {
                    setUserFirstNameEntered(e.target.value);
                  }}
                />
              </div>
              <div className="form-sections">
                <span className="login-and-register-form-title">Last Name</span>
                <input
                  type="text"
                  className="login-and-register-form-input"
                  placeholder="Type Last Name"
                  value={userLastNameEntered}
                  onChange={(e) => {
                    setUserLastNameEntered(e.target.value);
                  }}
                />
              </div>
              <div className="form-sections">
                <span className="login-and-register-form-title">Password</span>
                <input
                  type="password"
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
              className="btn-register"
              onClick={handleUserRegister}
            >
              Register
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

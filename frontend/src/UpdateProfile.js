import React, { useState, useEffect } from "react";
import baseUrl from "./api/backendApi";

const UpdateProfile = ({ setCreator, creator }) => {
  const { id, username, token } = creator;

  const [userEntered, setUserEntered] = useState("");
  const [userEmailEntered, setUserEmailEntered] = useState("");
  const [userFirstNameEntered, setUserFirstNameEntered] = useState("");
  const [userLastNameEntered, setUserLastNameEntered] = useState("");
  const [userPasswordEntered, setUserPasswordEntered] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState([]);

  const getCreatorProfile = async () => {
    const response = await fetch(`${baseUrl}/creators/${id}`); //this does not require token in the backend
    const responseCreatorProfile = await response.json();
    setCreatorProfile(responseCreatorProfile);
  };

  useEffect(() => {
    getCreatorProfile();
  }, [creator]);

  //HANDLE USER REGISTER
  const handleUserUpdate = async (e) => {
    e.preventDefault();

    const submitNewUser = await fetch(`${baseUrl}/creators/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
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
    setUpdateStatus(true);
    setUserEntered("");
    setUserEmailEntered("");
    setUserFirstNameEntered("");
    setUserLastNameEntered("");
    setUserPasswordEntered("");
  };

  return (
    <>
      <section className="add-respondent-sect">
        <div className="login-and-register-banner">UPDATE PROFILE</div>
        <div className="login-and-register-display">
          <div className="login-form">
            <form>
              <div className="form-sections">
                <span className="login-and-register-form-title">Username:</span>
                <input
                  type="text"
                  className="login-and-register-form-input"
                  placeholder={username}
                  value={userEntered}
                  onChange={(e) => {
                    setUserEntered(e.target.value);
                  }}
                />
              </div>
              <div className="form-sections">
                <span className="login-and-register-form-title">
                  User Email:
                </span>
                <input
                  type="text"
                  className="login-and-register-form-input"
                  placeholder={creatorProfile.email}
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
                  placeholder={creatorProfile.first_name}
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
                  placeholder={creatorProfile.last_name}
                  value={userLastNameEntered}
                  onChange={(e) => {
                    setUserLastNameEntered(e.target.value);
                  }}
                />
              </div>
              <div className="form-sections">
                <span className="login-and-register-form-title">Password</span>
                <input
                  type="text"
                  className="login-and-register-form-input"
                  placeholder="Type new password"
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
              onClick={handleUserUpdate}
            >
              Update
            </button>
            <div>{updateStatus ? "Update Complete" : ""}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;

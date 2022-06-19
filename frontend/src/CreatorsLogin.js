import React, { useEffect } from "react";
const url = "/creators";

const CreatorsLogin = ({ setCreator }) => {
  const getCreators = async () => {
    const response = await fetch(url);
    const creators = await response.json();
    setCreator(creators[0]);
    console.log(creators);
  };

  useEffect(() => {
    getCreators();
  }, []);

  return (
    <>
      <h3>Creators</h3>
    </>
  );
};

export default CreatorsLogin;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = ({ setUser }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !email) return;
//     setUser({ name: name, email: email });
//     navigate("/quizzes");
//   };

//   return (
//     <section className="section">
//       <form className="form" onSubmit={handleSubmit}>
//         <h5>login</h5>
//         <div className="form-row">
//           <label htmlFor="name" className="form-label">
//             name
//           </label>
//           <input
//             type="text"
//             className="form-input"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-row">
//           <label htmlFor="email" className="form-label">
//             email
//           </label>
//           <input
//             type="email"
//             className="form-input"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-block">
//           Login
//         </button>
//       </form>
//     </section>
//   );
// };
// export default Login;

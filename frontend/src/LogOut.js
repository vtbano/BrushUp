import React from "react";
import { Link } from "react-router-dom";

const LogOut = () => {
  return (
    <section>
      <h2>You are successfully logged out!</h2>
      <Link to="/">Back Home</Link>
    </section>
  );
};

export default LogOut;

import React from "react";
import { Link } from "react-router-dom";

const LogOut = () => {
  return (
    <section>
      <div>You are successfully logged out!</div>
      <Link to="/">Back Home</Link>
    </section>
  );
};

export default LogOut;

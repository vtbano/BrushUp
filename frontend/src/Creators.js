import React, { useState, useEffect } from "react";
const url = "http://localhost:3000/creators";

const Creators = () => {
  const [creators, setCreators] = useState([]);

  const getCreators = async () => {
    const response = await fetch(url);
    const creators = await response.json();
    setCreators(creators);
    console.log(creators);
  };

  useEffect(() => {
    getCreators();
  }, []);

  return (
    <React.Fragment>
      <h3>Creators</h3>
    </React.Fragment>
  );
};

export default Creators;

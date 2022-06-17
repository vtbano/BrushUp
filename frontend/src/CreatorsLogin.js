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

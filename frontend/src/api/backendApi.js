const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://protected-retreat-11747.herokuapp.com"
    : // ? "https://git.heroku.com/protected-retreat-11747.git/brushup"
      "http://localhost:3001";

export default baseUrl;

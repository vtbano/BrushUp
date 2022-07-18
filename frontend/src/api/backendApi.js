const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://protected-retreat-11747.herokuapp.com"
    : "http://localhost:3001";

export default baseUrl;

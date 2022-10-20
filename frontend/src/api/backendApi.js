const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://brushup.onrender.com"
    : "http://localhost:3001";

export default baseUrl;

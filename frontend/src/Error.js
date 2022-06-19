import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section>
      <h2>Error 404</h2>
      <p>Page Not Found</p>
      <Link to="/">Back Home</Link>
    </section>
  );
};

export default Error;

import React from "react";

const Footer = () => {
  return (
    <span className="created-by">
      <div>
        Created by <span className="footer-details-bold">Vanessa Bano </span>
      </div>
      <span>
        {"Link to "}
        <a
          href="https://github.com/vtbano/BrushUp"
          target="_blank"
          alt="GitHub link to BrushUp App"
          id="githubLink"
          className="footer-details-bold"
        >
          GitHub
        </a>
      </span>

      <span>
        {" & "}
        <a
          href="https://www.linkedin.com/in/vanessatbano/"
          target="_blank"
          alt="Vanessa Bano's LinkedIn profile"
          id="LinkedIn"
          className="footer-details-bold"
        >
          LinkedIn
        </a>
      </span>
    </span>
  );
};
export default Footer;

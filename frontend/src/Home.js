import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="home-sect">
        <div className="home-display">
          <div className="home-summary">
            <div className="home-summary-first-paragraph">
              We are constantly learning and sometimes we need a little help
              recalling all the knowledge we’ve gained.
            </div>
            <div className="home-summary-second-paragraph">
              With <span>BrushUp</span> you can create mini quizzes to help you
              and others recall the knowledge they have tucked away in their
              memory bookshelf.
            </div>
            <Link to="register">
              <button type="submit" className="btn-get-started">
                GET STARTED
              </button>
            </Link>
          </div>
          <div></div>
          <div>
            <img
              src="/img/Bookshelf.png"
              alt="Girl looking at bookshelf"
              className="book-shelf-girl"
            />
          </div>
        </div>
        <div className="features-display">
          <img
            src="/img/CreativeLightPenNotepad.png"
            alt="Lightbulb and paper to imply create"
            className="feature-img"
          />
          <img
            src="/img/Share_Outline.png"
            alt="People are sharing notes and has the share symbol"
            className="feature-img"
          />
          <img
            src="/img/Graphics_and_charts_Tracking.png"
            alt="A horizontal bar graph chart"
            className="feature-img"
          />
        </div>
        <div className="features-display">
          <div> CREATE</div>
          <div>SHARE</div>
          <div>TRACK</div>
        </div>
      </section>
    </>
  );
};

export default Home;

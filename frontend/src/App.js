import React from "react";
import "./App.css";
import Creators from "./Creators";
import Quizzes from "./Quizzes";
import NavigationButtons from "./NavigationButtons";
import Footer from "./Footer";

const App = () => {
  return (
    <React.Fragment>
      <div className="page-body">
        <header>
          <div className="title">
            <span className="bold-title">BRUSH</span>
            <span>UP</span>
          </div>
          <div className="navigation-options">
            <NavigationButtons />
          </div>
        </header>
        <section className="main-display-section">
          <Creators />
          <Quizzes />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default App;

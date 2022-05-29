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
        <header className="page-body-header">
          <div></div>
          <div className="title">
            <span>BRUSH</span>
            <span className="title-bold">UP</span>
          </div>
          <div className="navigation-options">
            <NavigationButtons />
          </div>
        </header>
        <section className="page-body-main">
          {/* <Creators /> */}
          <Quizzes />
        </section>
        <footer className="page-body-footer">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default App;

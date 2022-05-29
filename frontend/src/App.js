import React, { useState } from "react";
import "./App.css";
import Creators from "./Creators";
import Quizzes from "./Quizzes";
import CreateQuiz from "./CreateQuiz";
import NavigationButtons from "./NavigationButtons";
import Footer from "./Footer";

const App = () => {
  const [activeContainer, setActiveContainer] = useState("Quizzes");
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
          {/* if the text is true then it will return the second value. */}
          {activeContainer === "Creators" && <Creators />}
          {activeContainer === "Quizzes" && (
            <Quizzes setActiveContainer={setActiveContainer} />
          )}
          {activeContainer === "CreateQuiz" && <CreateQuiz />}
        </section>
        <footer className="page-body-footer">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default App;

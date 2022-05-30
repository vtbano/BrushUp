import React, { useState } from "react";
import "./App.css";
import CreatorsLogin from "./CreatorsLogin";
import Quizzes from "./Quizzes";
import CreateQuiz from "./CreateQuiz";
import QuizQuestions from "./QuizQuestions";
import NavigationButtons from "./NavigationButtons";
import Footer from "./Footer";

const App = () => {
  const [activeContainer, setActiveContainer] = useState("Quizzes");
  const [creator, setCreator] = useState({
    id: 1,
    username: "**Fetch Creator from CreatorsLogin Component**",
  });
  const [quizzes, setQuizzes] = useState([]);
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
          {activeContainer === "Creators" && (
            <CreatorsLogin setCreator={setCreator} />
          )}
          {activeContainer === "Quizzes" && (
            <Quizzes
              setActiveContainer={setActiveContainer}
              setQuizzes={setQuizzes}
              creator={creator}
            />
          )}
          {activeContainer === "CreateQuiz" && (
            <CreateQuiz
              setActiveContainer={setActiveContainer}
              setQuizzes={setQuizzes}
              creator={creator}
            />
          )}
          {activeContainer === "QuizQuestions" && (
            <QuizQuestions
              setActiveContainer={setActiveContainer}
              quizzes={quizzes}
              creator={creator}
            />
          )}
        </section>
        <footer className="page-body-footer">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default App;

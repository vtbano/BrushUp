import React, { useState } from "react";
import "./App.css";
import CreatorsLogin from "./CreatorsLogin";
import Quizzes from "./Quizzes";
import CreateQuiz from "./CreateQuiz";
import QuizQuestions from "./QuizQuestions";
import AddQuestion from "./AddQuestion";
import NavigationButtons from "./NavigationButtons";
import Footer from "./Footer";

const App = () => {
  const [activeContainer, setActiveContainer] = useState("Quizzes");
  const [creator, setCreator] = useState({
    id: 1,
    username: "**Fetch Creator from CreatorsLogin Component**",
  });
  const [activeQuiz, setActiveQuiz] = useState(null); //if intended to be an object you can start of with null state
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questionPlaceholder, setQuestionPlaceholder] = useState(
    "Example: Can dogs eat chocolate?"
  );
  const [imagePlaceholder, setImagePlaceholder] = useState(
    "Copy image address here!"
  );
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
            <NavigationButtons
              setActiveContainer={setActiveContainer}
              creator={creator}
            />
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
              creator={creator}
              setActiveQuiz={setActiveQuiz}
            />
          )}
          {activeContainer === "CreateQuiz" && (
            <CreateQuiz
              setActiveContainer={setActiveContainer}
              creator={creator}
              setActiveQuiz={setActiveQuiz}
            />
          )}
          {activeContainer === "QuizQuestions" && (
            <QuizQuestions
              setActiveContainer={setActiveContainer}
              key={activeQuiz.id}
              {...activeQuiz}
              setActiveQuestion={setActiveQuestion}
              setQuestionPlaceholder={setQuestionPlaceholder}
              setImagePlaceholder={setImagePlaceholder}
              setQuestionText={setQuestionText}
              setImageUrl={setImageUrl}
            />
          )}
          {activeContainer === "AddQuestion" && (
            <AddQuestion
              setActiveContainer={setActiveContainer}
              key={activeQuestion.id}
              {...activeQuestion}
              questionPlaceholder={questionPlaceholder}
              imagePlaceholder={imagePlaceholder}
              setImagePlaceholder={setImagePlaceholder}
              questionText={questionText}
              setQuestionPlaceholder={setQuestionPlaceholder}
              setQuestionText={setQuestionText}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
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

import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatorsLogin from "./CreatorsLogin";
import Quizzes from "./Quizzes";
import CreateQuiz from "./CreateQuiz";
import EditQuizTitle from "./EditQuizTitle";
import QuizQuestions from "./QuizQuestions";
import AddQuestion from "./AddQuestion";
import NavigationButtons from "./NavigationButtons";
import Footer from "./Footer";
import Error from "./Error";
import CreatorsLogin from "./CreatorsLogin";

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
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<App />}>
    //       <Route path="register" element={<CreatorsLogin />} />
    //       <Route path="quizzes" element={<Quizzes />} />
    //       <Route path="quizzes/create" element={<CreateQuiz />} />
    //       <Route path="quizzes/:id/edit" element={<EditQuizTitle />} />
    //       <Route path="quizzes/:id/questions" element={<QuizQuestions />} />
    //       <Route path="quizzes/:id/questions/add" element={<AddQuestion />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter>
      <div className="page-body">
        <header className="page-body-header">
          <div></div>
          <div className="title">
            <span>BRUSH</span>
            <span className="title-bold">UP</span>
          </div>
          <div className="navigation-options">
            <NavigationButtons creator={creator} />
          </div>
        </header>
        <section className="page-body-main">
          <Routes>
            <Route
              path="creators"
              element={<CreatorsLogin setCreator={setCreator} />}
            />
            {/* {activeContainer === "Creators" && (
            <CreatorsLogin setCreator={setCreator} />
          )} */}
            <Route path="quizzes" element={<Quizzes creator={creator} />} />

            <Route
              path="quizzes/create"
              element={
                <CreateQuiz creator={creator} setActiveQuiz={setActiveQuiz} />
              }
            />

            <Route
              path="quizzes/:id/edit"
              element={
                <EditQuizTitle
                  activeQuiz={activeQuiz}
                  setActiveQuiz={setActiveQuiz}
                />
              }
            />

            {/* {activeContainer === "EditQuizTitle" && (
            <EditQuizTitle
              setActiveContainer={setActiveContainer}
              activeQuiz={activeQuiz}
              setActiveQuiz={setActiveQuiz}
            />
          )} */}

            <Route
              path={`quizzes/:id/questions`}
              element={
                <QuizQuestions
                  activeQuiz={activeQuiz}
                  setActiveQuestion={setActiveQuestion}
                  setQuestionPlaceholder={setQuestionPlaceholder}
                  setImagePlaceholder={setImagePlaceholder}
                  setQuestionText={setQuestionText}
                  setImageUrl={setImageUrl}
                />
              }
            />
            {/* {activeContainer === "QuizQuestions" && (
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
          )} */}
            {/* {activeContainer === "AddQuestion" && (
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
          )}  */}
            <Route path="*" element={Error} />
          </Routes>
        </section>
        <footer className="page-body-footer">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;

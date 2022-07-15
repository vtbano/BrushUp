import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Quizzes from "./Quizzes";
import CreateQuiz from "./CreateQuiz";
import EditQuizTitle from "./EditQuizTitle";
import QuizQuestions from "./QuizQuestions";
import AddQuestion from "./AddQuestion";
import NavigationButtons from "./NavigationButtons";
import Footer from "./Footer";
import Error from "./Error";
import QuizTakerView from "./QuizTakerView";
import ShareQuiz from "./ShareQuiz";
import TrackResults from "./TrackResults";
import Login from "./Login";
import Register from "./Register";
import LogOut from "./LogOut";
import UpdateProfile from "./UpdateProfile";

const App = () => {
  const getLocalStorage = () => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      return JSON.parse(localStorage.getItem("user"));
    } else return null;
  };

  const [creator, setCreator] = useState(getLocalStorage());
  const [questionPlaceholder, setQuestionPlaceholder] = useState(
    "Example: Can dogs eat chocolate?"
  );
  const [imagePlaceholder, setImagePlaceholder] = useState(
    "Copy image address here!"
  );
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(creator));
  }, [creator]);

  return (
    <BrowserRouter>
      <div className="page-body">
        <header className="page-body-header">
          <div></div>
          <div className="title">
            <span>BRUSH</span>
            <span className="title-bold">UP</span>
          </div>
          <div className="navigation-options">
            <NavigationButtons creator={creator} setCreator={setCreator} />
          </div>
        </header>
        <section className="page-body-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login setCreator={setCreator} />} />
            <Route
              path="register"
              element={<Register setCreator={setCreator} />}
            />
            <Route
              path="update"
              element={<UpdateProfile creator={creator} />}
            />
            <Route path="logout" element={<LogOut />} />

            <Route path="quizzes" element={<Quizzes creator={creator} />} />

            <Route
              path="quizzes/create"
              element={<CreateQuiz creator={creator} />}
            />

            <Route path="quizzes/:id/edit" element={<EditQuizTitle />} />

            <Route
              path={`quizzes/:id/questions`}
              element={
                <QuizQuestions
                  setQuestionPlaceholder={setQuestionPlaceholder}
                  setImagePlaceholder={setImagePlaceholder}
                  setQuestionText={setQuestionText}
                  setImageUrl={setImageUrl}
                />
              }
            />
            <Route
              path="quizzes/:id/questions/add/:questionId"
              element={
                <AddQuestion
                  questionPlaceholder={questionPlaceholder}
                  imagePlaceholder={imagePlaceholder}
                  setImagePlaceholder={setImagePlaceholder}
                  questionText={questionText}
                  setQuestionPlaceholder={setQuestionPlaceholder}
                  setQuestionText={setQuestionText}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
              }
            />
            <Route path="quizzes/:id" element={<QuizTakerView />} />
            <Route path="quizzes/:id/share" element={<ShareQuiz />} />
            <Route path="creator/:id/responses" element={<TrackResults />} />

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

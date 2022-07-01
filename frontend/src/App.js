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
import QuizTakerView from "./QuizTakerView";
import ShareQuiz from "./ShareQuiz";
import TrackResults from "./TrackResults";

const App = () => {
  const [creator, setCreator] = useState({
    id: 1,
    username: "**Fetch Creator from CreatorsLogin Component**",
  });
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

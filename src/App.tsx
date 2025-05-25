import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import DisplayQuestions from "./components/displayQuestions";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/quiz/:id" element={<DisplayQuestions />} />
        </Routes>

        <ToastContainer
          position="top-left"
          autoClose={2000}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;

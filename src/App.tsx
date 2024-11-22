import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/NavigationComponent";
import HomePage from "./pages/HomePage";
import AddUserPage from "./pages/AddUserPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-user" element={<AddUserPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

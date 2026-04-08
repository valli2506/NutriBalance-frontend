import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/Profile";

// 🔥 NEW PAGES
import UploadFood from "./pages/UploadFood";
import FoodHistory from "./pages/FoodHistory";
import DailyPage from "./pages/DailyPage";
import WaterPage from "./pages/WaterPage";
import Reports from "./pages/Reports";
import ChatBot from "./pages/CHatBot";
import DietRecommendation from "./pages/Dietrecommend";


function App() {
  return (
    <Router>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Welcome />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Profile Flow */}
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/profile" element={<Profile />} />

        {/* Main Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-food" element={<UploadFood />} />
        <Route path="/history" element={<FoodHistory />} />
        <Route path="/daily" element={<DailyPage />} />
        <Route path="/water" element={<WaterPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/diet" element={<DietRecommendation />} />


        {/* 404 Page */}
        <Route path="*" element={<div>Page Not Found ❌</div>} />

      </Routes>
    </Router>
  );
}

export default App;
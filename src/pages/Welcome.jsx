import React from "react";
import { useNavigate } from "react-router-dom";
import "../welcome.css";

function Welcome() {

  const navigate = useNavigate();

  return (
    <div className="welcome-container">

      {/* FLOATING LEAVES */}
      <div className="leaf leaf1"></div>
      <div className="leaf leaf2"></div>
      <div className="leaf leaf3"></div>
      <div className="leaf leaf4"></div>

      <div className="welcome-card">

        {/* LOGO CIRCLE */}
        <div className="logo-circle">
          🥗
        </div>

        {/* TITLE */}
        <h1 className="title">NutriBalance</h1>

        {/* TAGLINE */}
        <p className="tagline">
          Eat Smart • Live Strong • Stay Balanced
        </p>

        <div className="divider">
          <span>💚</span>
        </div>

        {/* WELCOME */}
        <h2 className="welcome-text">Welcome!</h2>

        <p className="desc">
          Your journey to better health starts here.<br />
          Track, analyze, and nourish your life every day.
        </p>

        {/* BUTTON */}
        <button
          className="start-btn"
          onClick={() => navigate("/login")}
        >
          Get Started →
        </button>

      </div>
    </div>
  );
}

export default Welcome;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/water.css";

function Water() {

  const [water, setWater] = useState(0);
  const WATER_GOAL = 2000;

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchWater();
  }, []);

  const fetchWater = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/water/user/${username}`);
      const data = await res.json();

      const today = new Date().toLocaleDateString("en-CA");

      const total = data
        .filter(w => w.date === today)
        .reduce((sum, w) => sum + (w.amount || 0), 0);

      setWater(total);

    } catch (err) {
      console.error("Error:", err);
    }
  };

  const addWater = async (amount) => {
    try {
      await fetch("http://localhost:8080/api/water/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          amount
        })
      });

      fetchWater();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const percentage = Math.min((water / WATER_GOAL) * 100, 100);

  return (
    <div className="water-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>NutriBalance</h2>
        <ul>
          <li><Link to="/dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/profile">👤 Profile</Link></li>
          <li><Link to="/upload-food">📷 Upload Food</Link></li>
          <li><Link to="/history">📜 Food History</Link></li>
          <li><Link to="/reports">📊 Reports</Link></li>
          <li><Link to="/daily">📅 Daily</Link></li>
          <li className="active">💧 Water</li>
          <li><Link to="/diet">🥗 Diet</Link></li>
          <li><Link to="/chat">🤖 Chat</Link></li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="water-main">

        <h1>💧 Water Intake Tracker</h1>
        <p className="subtitle">Stay hydrated and track your daily water consumption</p>

        <div className="water-grid">

          {/* LEFT CARD */}
          <div className="water-card">

            <h3>➕ Add Water</h3>
            <p className="sub">Log your water consumption</p>

            <input
              type="number"
              value={250}
              className="input"
              readOnly
            />

            <div className="quick-buttons">
              <div onClick={() => addWater(250)}>🥤 1 Glass<br /><span>250ml</span></div>
              <div onClick={() => addWater(500)}>💧 1 Bottle<br /><span>500ml</span></div>
              <div onClick={() => addWater(750)}>🧴 Large<br /><span>750ml</span></div>
            </div>

            <button className="add-btn" onClick={() => addWater(250)}>
              ➕ Add Water
            </button>

            {/* PROGRESS */}
            <div className="progress-section">
              <div className="progress-header">
                <span>Daily Progress</span>
                <b>{water}ml / {WATER_GOAL}ml</b>
              </div>

              <div className="progress-bar">
                <div
                  className="fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p>{Math.round(percentage)}% of daily goal achieved</p>
            </div>

            {/* BENEFITS */}
            <div className="benefits">
              <h4>📈 Hydration Benefits</h4>
              <ul>
                <li>✔ Improves physical performance</li>
                <li>✔ Supports brain function</li>
                <li>✔ Keeps skin healthy</li>
              </ul>
            </div>

          </div>

          {/* RIGHT CARD (BOTTLE UI) */}
          <div className="visual-card">

            <h3>Hydration Visualization</h3>

            <div className="bottle">
              <div
                className="water-fill"
                style={{ height: `${percentage}%` }}
              >
                <div className="wave"></div>
              </div>

              <div className="percent-box">
                💧 {Math.round(percentage)}%
              </div>
            </div>

            <h2>{water}ml</h2>
            <p>consumed today</p>

            <div className="remaining">
              {WATER_GOAL - water}ml remaining
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Water;
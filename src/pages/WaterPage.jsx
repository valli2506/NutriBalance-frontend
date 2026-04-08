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
      console.error("Error fetching water:", err);
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
          username: username,
          amount: amount
        })
      });

      fetchWater();

    } catch (error) {
      console.error("Error adding water:", error);
    }
  };

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
          <li><Link to="/water">💧 Water</Link></li>
          <li><Link to="/diet">🥗 Diet</Link></li>
          <li><Link to="/chat">🤖 Chat</Link></li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="water-main">

        <h2>💧 Water Intake</h2>

        <div className="water-card">

          <h3>{water} / {WATER_GOAL} ml</h3>

          <div className="progress-bar">
            <div
              className="fill water"
              style={{
                width: `${Math.min((water / WATER_GOAL) * 100, 100)}%`
              }}
            ></div>
          </div>

          {/* 🔥 BOTTLE ANIMATION */}
          <div className="bottle">
            <div
              className="water-fill"
              style={{
                height: `${Math.min((water / WATER_GOAL) * 100, 100)}%`
              }}
            >
              <div className="wave"></div>
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="water-buttons">
          <button onClick={() => addWater(250)}>+250 ml</button>
          <button onClick={() => addWater(500)}>+500 ml</button>
          <button onClick={() => addWater(1000)}>+1 L</button>
        </div>

      </div>

    </div>
  );
}

export default Water;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/daily.css";

function DailyPage() {

  const [foods, setFoods] = useState([]);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);

  const CAL_GOAL = 2000;
  const PROTEIN_GOAL = 60;

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {

      // 🔥 GET USERNAME FROM LOCALSTORAGE
      const username = localStorage.getItem("username");

      const response = await fetch(`http://localhost:8080/api/food/user/${username}`);
      const data = await response.json();

      const today = new Date().toLocaleDateString("en-CA");

      // ✅ FILTER TODAY FOOD
      const todayFoods = data.filter(f => f.date === today);

      setFoods(todayFoods);

      let totalCal = 0;
      let totalPro = 0;
      let totalCarbs = 0;

      todayFoods.forEach(f => {
        totalCal += f.calories || 0;
        totalPro += f.protein || 0;
        totalCarbs += f.carbs || 0;
      });

      setCalories(totalCal);
      setProtein(totalPro);
      setCarbs(totalCarbs);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="daily-container">

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
      <div className="daily-main">

        <h2>📅 Today’s Intake</h2>

        {/* 🔥 PROGRESS */}
        <div className="progress-section">

          <div className="progress-card">
            <h3>🔥 Calories</h3>
            <p>{calories} / {CAL_GOAL} kcal</p>
            <div className="bar">
              <div
                className="fill"
                style={{ width: `${Math.min((calories / CAL_GOAL) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-card">
            <h3>💪 Protein</h3>
            <p>{protein} / {PROTEIN_GOAL} g</p>
            <div className="bar">
              <div
                className="fill protein"
                style={{ width: `${Math.min((protein / PROTEIN_GOAL) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* EXTRA */}
        <div className="extra-grid">

          <div className="extra-card">
            <h3>🍞 Carbs</h3>
            <p>{carbs} g</p>
          </div>

          <div className="extra-card">
            <h3>🧪 Vitamins</h3>
            <p>No data</p>
          </div>

          <div className="extra-card">
            <h3>🪨 Minerals</h3>
            <p>No data</p>
          </div>

          <div className="extra-card">
            <h3>🥛 Dairy</h3>
            <p>0 items</p>
          </div>

        </div>

        {/* FOOD LIST */}
        <div className="food-section">
          <h3>🍱 Foods Today</h3>

          {foods.length === 0 ? (
            <p>No food added today</p>
          ) : (
            foods.map((f, i) => (
              <div key={i} className="food-item">
                <div>
                  <h4>{f.name}</h4>
                </div>
                <div className="right">
                  <p>{f.calories} kcal</p>
                  <p>{f.protein} g</p>
                </div>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default DailyPage;
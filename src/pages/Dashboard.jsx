import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard.css";

function Dashboard() {

  const [foods, setFoods] = useState([]);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [vitamins, setVitamins] = useState(0);
  const [minerals, setMinerals] = useState(0);
  const [water, setWater] = useState(0);

  const username = localStorage.getItem("username");

  const CAL_GOAL = 2000;
  const PROTEIN_GOAL = 60;
  const WATER_GOAL = 2000;

  useEffect(() => {
    fetchFoods();
    fetchWater();
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  // ✅ FETCH FOOD
  const fetchFoods = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/food/user/${username}`);
      const data = await res.json();

      const today = new Date().toLocaleDateString("en-CA");

      const todayFoods = data.filter(f => f.date === today);

      setFoods(todayFoods);

      let totalCal = 0;
      let totalPro = 0;
      let vitCount = 0;
      let minCount = 0;

      todayFoods.forEach(f => {
        totalCal += f.calories || 0;
        totalPro += f.protein || 0;

        if (f.vitamins) vitCount++;
        if (f.minerals) minCount++;
      });

      setCalories(totalCal);
      setProtein(totalPro);
      setVitamins(vitCount);
      setMinerals(minCount);

    } catch (err) {
      console.error("Food fetch error", err);
    }
  };

  // ✅ FETCH WATER
  const fetchWater = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/water/user/${username}`);
      const data = await res.json();

      const today = new Date().toISOString().split("T")[0];

      const totalWater = data
        .filter(w => w.date === today)
        .reduce((sum, w) => sum + (w.amount || 0), 0);

      setWater(totalWater);

    } catch (err) {
      console.error("Water fetch error", err);
    }
  };

  return (
    <div className="dashboard-container">

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
      <div className="main">

        <div className="topbar">
          <h1>Welcome, {username} 👋</h1>

          {/* 🔥 LOGOUT BUTTON */}
          <button className="logout-btn" onClick={handleLogout}>
  🚪 Logout
</button>
        </div>

        {/* 🔥 STATS */}
        <div className="stats">

          <div className="card">
            <h3>🔥 Calories</h3>
            <p>{calories} / {CAL_GOAL}</p>
            <div className="progress-bar">
              <div
                className="fill calories"
                style={{ width: `${Math.min((calories / CAL_GOAL) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <h3>💪 Protein</h3>
            <p>{protein} / {PROTEIN_GOAL} g</p>
            <div className="progress-bar">
              <div
                className="fill protein"
                style={{ width: `${Math.min((protein / PROTEIN_GOAL) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <h3>💧 Water</h3>
            <p>{water} / {WATER_GOAL} ml</p>
            <div className="progress-bar">
              <div
                className="fill water"
                style={{ width: `${Math.min((water / WATER_GOAL) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <h3>BMI</h3>
            <p>21.4 (Normal)</p>
          </div>

          <div className="card">
            <h3>🥦 Vitamins</h3>
            <p>{vitamins} / 5</p>
            <div className="progress-bar">
              <div
                className="fill vitamins"
                style={{ width: `${Math.min((vitamins / 5) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <h3>⚡ Minerals</h3>
            <p>{minerals} / 5</p>
            <div className="progress-bar">
              <div
                className="fill minerals"
                style={{ width: `${Math.min((minerals / 5) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* 🍱 TODAY FOODS */}
        <div className="card" style={{ marginTop: "20px" }}>
          <h3>🍽 Foods Today</h3>

          {foods.length === 0 ? (
            <p>No food added today</p>
          ) : (
            foods.map((f, i) => (
              <p key={i}>
                {f.name} - {f.calories} kcal | {f.protein}g
              </p>
            ))
          )}

        </div>

        {/* 💡 TIPS */}
        <div className="tips">
          <h3>💡 Smart Tips</h3>
          <ul>
            <li>🔥 Reduce sugar</li>
            <li>🏃 Cardio daily</li>
            <li>🥗 Eat veggies</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
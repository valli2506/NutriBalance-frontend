import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/daily.css";

function DailyPage() {

  const [foods, setFoods] = useState([]);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);

  // ✅ manual ticks
  const [checkedMeals, setCheckedMeals] = useState({
    Breakfast: false,
    Lunch: false,
    Snack: false,
    Dinner: false
  });

  // ✅ weekly data
  const [weekData, setWeekData] = useState([]);

  const CAL_GOAL = 2000;
  const PROTEIN_GOAL = 60;

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const username = localStorage.getItem("username");

      const res = await fetch(`http://localhost:8080/api/food/user/${username}`);
      const data = await res.json();

      const today = new Date().toLocaleDateString("en-CA");

      // ✅ TODAY DATA
      const todayFoods = data.filter(f =>
        (f.date || "").startsWith(today)
      );

      setFoods(todayFoods);

      let cal = 0, pro = 0;

      todayFoods.forEach(f => {
        cal += f.calories || 0;
        pro += f.protein || 0;
      });

      setCalories(cal);
      setProtein(pro);

      // ✅ WEEK DATA (last 7 days)
      const last7 = data.filter(f => {
        const d = new Date(f.date);
        const now = new Date();
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      });

      const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
      const activeDays = new Set(
        last7.map(f =>
          new Date(f.date).toLocaleDateString("en-US", { weekday: "short" })
        )
      );

      setWeekData(days.map(d => activeDays.has(d)));

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ toggle meals manually
  const toggleMeal = (meal) => {
    setCheckedMeals(prev => ({
      ...prev,
      [meal]: !prev[meal]
    }));
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

        <h1>🎯 Daily Tracker</h1>

        <div className="grid">

          {/* LEFT */}
          <div className="left">

            {/* ✅ PROGRESS */}
            <div className="progress-card">
              <h2>Today's Progress</h2>

              <p>Calories {calories}/{CAL_GOAL}</p>
              <div className="bar">
                <div style={{ width: `${(calories / CAL_GOAL) * 100}%` }}></div>
              </div>

              <p>Protein {protein}/{PROTEIN_GOAL}</p>
              <div className="bar protein">
                <div style={{ width: `${(protein / PROTEIN_GOAL) * 100}%` }}></div>
              </div>
            </div>

            {/* ✅ FOODS YOU ATE */}
            <div className="foods-card">
              <h3>🍽 Foods You Ate Today</h3>

              {foods.length === 0 ? (
                <p>No food added</p>
              ) : (
                foods.map((f, i) => (
                  <div key={i} className="food-item">
                    <span>{f.name}</span>
                    <span>{f.calories} kcal</span>
                  </div>
                ))
              )}
            </div>

            {/* ✅ MEAL CHECKBOXES */}
            <div className="meals">
              {["Breakfast","Lunch","Snack","Dinner"].map((meal, i) => (
                <div
                  key={i}
                  className={`meal ${checkedMeals[meal] ? "done" : ""}`}
                  onClick={() => toggleMeal(meal)}
                >
                  <div className="circle">
                    {checkedMeals[meal] && "✔"}
                  </div>
                  <span>{meal}</span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div className="right">

            <h3>🏅 This Week</h3>

            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
              <div key={i} className={`day ${weekData[i] ? "active" : ""}`}>
                <span>{d}</span>
                <span>{weekData[i] ? "✔" : ""}</span>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default DailyPage;
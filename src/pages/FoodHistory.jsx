import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/foodHistory.css";

function FoodHistory() {

  const [groupedFoods, setGroupedFoods] = useState({});

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {

      // 🔥 GET USERNAME FROM LOCALSTORAGE
      const username = localStorage.getItem("username");

      const res = await fetch(`http://localhost:8080/api/food/user/${username}`);
      const data = await res.json();

      console.log("History Data:", data);

      const grouped = {};

      data.forEach((food) => {
        const date = food.date || "No Date";

        if (!grouped[date]) {
          grouped[date] = [];
        }

        grouped[date].push(food);
      });

      setGroupedFoods(grouped);

    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <div className="history-container">

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
      <div className="history-main">

        <h2>📜 Food History</h2>

        {Object.keys(groupedFoods).length === 0 && (
          <p className="empty">No food data yet</p>
        )}

        {Object.keys(groupedFoods).map((date) => {

          const foods = groupedFoods[date];

          const totalCalories = foods.reduce((sum, f) => sum + (f.calories || 0), 0);
          const totalProtein = foods.reduce((sum, f) => sum + (f.protein || 0), 0);

          return (
            <div key={date} className="date-block">

              <div className="date-header">
                <h3>📅 {date}</h3>
                <div className="totals">
                  <span>{totalCalories} kcal</span>
                  <span>{totalProtein} g</span>
                </div>
              </div>

              <div className="food-list">
                {foods.map((food, index) => (
                  <div key={index} className="food-card">

                    <div>
                      <h4>{food.name}</h4>
                    </div>

                    <div className="right">
                      <p>{food.calories} kcal</p>
                      <p>{food.protein} g</p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default FoodHistory;
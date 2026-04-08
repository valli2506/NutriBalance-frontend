import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/diet.css";

function Diet() {
  const [tips, setTips] = useState([]);
  const [foods, setFoods] = useState([]);
  const [goal, setGoal] = useState("");

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));

    if (!profile) return;

    setGoal(profile.goal);

    let tipsArr = [];
    let foodArr = [];

    if (profile.goal === "Weight Loss") {
      tipsArr = [
        "🔥 Reduce sugar intake",
        "🥗 Eat more vegetables",
        "🏃 Do cardio daily",
        "🍽 Control portions",
        "💧 Drink more water",
        "🚫 Avoid fried foods",
        "🥒 Eat fiber-rich foods",
        "⏰ Maintain meal timing",
        "🍵 Drink green tea",
        "🥑 Include healthy fats"
      ];

      foodArr = [
        "Oats", "Brown Rice", "Boiled Eggs", "Grilled Chicken",
        "Salads", "Spinach", "Apple", "Carrot",
        "Broccoli", "Green Tea"
      ];
    }

    else if (profile.goal === "Weight Gain") {
      tipsArr = [
        "💪 Increase calorie intake",
        "🍗 Eat protein-rich foods",
        "🥛 Drink milk daily",
        "🏋 Strength training",
        "🥜 Add healthy fats",
        "🍞 Eat frequently",
        "🍌 Banana shakes",
        "🧀 Cheese & paneer",
        "🍚 Eat rice",
        "🥩 Include meat"
      ];

      foodArr = [
        "Milk", "Banana Shake", "Paneer", "Eggs",
        "Chicken", "Rice", "Potato", "Peanut Butter",
        "Cheese", "Dry Fruits"
      ];
    }

    else {
      tipsArr = [
        "🥗 Maintain balanced diet",
        "🍎 Eat fruits daily",
        "🚶 Stay active",
        "💧 Drink enough water",
        "🥦 Eat vegetables",
        "🍗 Include protein",
        "🍚 Balanced carbs",
        "🧘 Reduce stress",
        "😴 Sleep well",
        "🍵 Avoid junk food"
      ];

      foodArr = [
        "Fruits", "Vegetables", "Rice", "Dal",
        "Eggs", "Milk", "Chicken", "Nuts",
        "Chapati", "Curd"
      ];
    }

    setTips(tipsArr);
    setFoods(foodArr);
  }, []);

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>NutriBalance</h2>
        <ul>
          <li><Link to="/dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/daily">📅 Daily</Link></li>
          <li><Link to="/upload-food">📷 Upload Food</Link></li>
          <li><Link to="/history">📜 Food History</Link></li>
          <li><Link to="/water">💧 Water</Link></li>
          <li><Link to="/reports">📊 Reports</Link></li>
          <li><Link to="/diet">🥗 Diet</Link></li>
          <li><Link to="/chat">🤖 AI Chat</Link></li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="diet-container">

        <h1>🥗 Diet Recommendations</h1>
        <h3 className="goal-text">Goal: {goal}</h3>

        {/* TIPS */}
        <div className="diet-card">
          <h2>💡 Smart Tips</h2>

          <div className="tips-grid">
            {tips.map((tip, i) => (
              <div key={i} className="tip-box">{tip}</div>
            ))}
          </div>
        </div>

        {/* FOODS */}
        <div className="diet-card">
          <h2>🍽 Recommended Foods</h2>

          <div className="food-grid">
            {foods.map((food, i) => (
              <div key={i} className="food-box">🍴 {food}</div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default Diet;
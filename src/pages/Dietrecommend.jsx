import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/diet.css";

function Diet() {

  const [type, setType] = useState("veg");
  const goal = localStorage.getItem("goal") || "Maintain";

  const foods = {
    veg: {
      loss: [
        { name: "Oats", calories: 150, protein: 5 },
        { name: "Vegetable Soup", calories: 100, protein: 3 },
        { name: "Salad Bowl", calories: 120, protein: 4 },
        { name: "Sprouts", calories: 140, protein: 6 },
        { name: "Fruit Bowl", calories: 180, protein: 3 }
      ],
      gain: [
        { name: "Paneer Curry", calories: 350, protein: 18 },
        { name: "Rice + Dal", calories: 400, protein: 12 },
        { name: "Peanut Butter", calories: 500, protein: 20 },
        { name: "Banana Shake", calories: 450, protein: 10 },
        { name: "Dry Fruits", calories: 550, protein: 15 }
      ],
      maintain: [
        { name: "Vegetable Upma", calories: 250, protein: 6 },
        { name: "Chapati + Sabzi", calories: 300, protein: 8 },
        { name: "Fruit Bowl", calories: 200, protein: 4 },
        { name: "Idli + Sambar", calories: 280, protein: 7 },
        { name: "Poha", calories: 230, protein: 5 }
      ]
    },

    nonveg: {
      loss: [
        { name: "Boiled Chicken", calories: 180, protein: 30 },
        { name: "Egg Whites", calories: 100, protein: 11 },
        { name: "Grilled Fish", calories: 200, protein: 25 },
        { name: "Chicken Salad", calories: 220, protein: 20 },
        { name: "Tuna", calories: 150, protein: 28 }
      ],
      gain: [
        { name: "Chicken Curry", calories: 450, protein: 35 },
        { name: "Egg Omelette", calories: 300, protein: 20 },
        { name: "Fish Fry", calories: 400, protein: 30 },
        { name: "Mutton Curry", calories: 500, protein: 28 },
        { name: "Chicken Biryani", calories: 600, protein: 25 }
      ],
      maintain: [
        { name: "Boiled Eggs", calories: 150, protein: 13 },
        { name: "Chicken Salad", calories: 250, protein: 20 },
        { name: "Grilled Fish", calories: 280, protein: 25 },
        { name: "Egg Curry", calories: 300, protein: 18 },
        { name: "Chicken Soup", calories: 200, protein: 15 }
      ]
    }
  };

  const tips = {
    loss: ["Eat low-calorie foods", "Avoid sugar", "Exercise daily"],
    gain: ["Eat more calories", "High protein intake", "Frequent meals"],
    maintain: ["Balanced diet", "Stay active", "Drink water"]
  };

  const goalKey = goal.toLowerCase();

  return (
    <div className="diet-container">

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
          <li className="active">🥗 Diet</li>
          <li><Link to="/chat">🤖 Chat</Link></li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="diet-main">

        <h1>✨ Diet Suggestions</h1>
        <p className="subtitle">
          Based on your goal: <b>{goal}</b>
        </p>

        {/* TYPE SELECT */}
        <div className="type-select">
          <div
            className={`type-card ${type === "veg" ? "active" : ""}`}
            onClick={() => setType("veg")}
          >
            🥦 Vegetarian
          </div>

          <div
            className={`type-card ${type === "nonveg" ? "active" : ""}`}
            onClick={() => setType("nonveg")}
          >
            🍗 Non-Vegetarian
          </div>
        </div>

        {/* FOOD SECTION */}
        <div className="food-section">
          <h2>Recommended Foods</h2>

          <div className="food-grid">
            {foods[type][goalKey].map((f, i) => (
              <div key={i} className="food-card">
                <h3>{f.name}</h3>
                <div className="food-meta">
                  <span>🔥 {f.calories} kcal</span>
                  <span>💪 {f.protein}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 PREMIUM TIPS */}
        <div className="tips-box">
          <h2>💡 Pro Tips</h2>

          <div className="tips-grid">
            {tips[goalKey].map((tip, i) => (
              <div key={i} className="tip-card">
                <div className="tip-number">{i + 1}</div>

                <div className="tip-content">
                  <h4>{tip}</h4>
                  <p>Improve your lifestyle by following this daily.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Diet;
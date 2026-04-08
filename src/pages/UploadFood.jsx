import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/uploadFood.css";

function UploadFood() {
  const [foodName, setFoodName] = useState("");
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  // IMAGE PREVIEW
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // MOCK AI LOGIC
  const analyzeFood = () => {
    if (!foodName && !preview) {
      alert("Enter food or upload image");
      return;
    }

    let data = {
      calories: 200,
      protein: 5,
      carbs: 30,
      vitamins: "Mixed",
      minerals: "Mixed"
    };

    const food = foodName.toLowerCase();

    if (food.includes("milk")) {
      data = { calories: 120, protein: 8, carbs: 12, vitamins: "D, B12", minerals: "Calcium" };
    } else if (food.includes("rice")) {
      data = { calories: 200, protein: 4, carbs: 45, vitamins: "B", minerals: "Iron" };
    } else if (food.includes("egg")) {
      data = { calories: 155, protein: 13, carbs: 1, vitamins: "A, D", minerals: "Iron" };
    }

    setResult(data);
  };

  // 🔥 SAVE TO BACKEND (ONLY FIX HERE)
  const saveFood = async () => {
    if (!result) {
      alert("Analyze food first!");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    // ✅ GET CURRENT USER
    const username = localStorage.getItem("username");

    const foodData = {
      name: foodName || "Food",
      calories: Number(result.calories) || 0,
      protein: Number(result.protein) || 0,
      carbs: Number(result.carbs) || 0,
      date: today,
      username: username   // ✅ FIXED
    };

    try {
      const res = await fetch("http://localhost:8080/api/food/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(foodData)
      });

      const data = await res.text();

      alert(data);

      // RESET
      setFoodName("");
      setPreview(null);
      setResult(null);

    } catch (error) {
      alert("Error saving food 😢");
    }
  };

  return (
    <div className="upload-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>NutriBalance</h2>
        <ul>
          <li><Link to="/dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/profile">👤 Profile</Link></li>
          <li className="active">📷 Upload Food</li>
          <li><Link to="/history">📜 Food History</Link></li>
          <li><Link to="/reports">📊 Reports</Link></li>
          <li><Link to="/daily">📅 Daily</Link></li>
          <li><Link to="/water">💧 Water</Link></li>
          <li><Link to="/diet">🥗 Diet</Link></li>
          <li><Link to="/chat">🤖 Chat</Link></li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="upload-main">
        <h2>📷 Upload / Enter Food</h2>

        <div className="upload-card">
          <input type="file" onChange={handleImage} />

          {preview && (
            <img src={preview} alt="preview" className="preview-img" />
          )}

          <p>OR</p>

          <input
            type="text"
            placeholder="Enter food (milk, rice, egg...)"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />

          <div className="btn-group">
            <button onClick={analyzeFood}>Analyze</button>
            <button onClick={saveFood}>Save</button>
          </div>
        </div>

        {result && (
          <div className="result-card">
            <h3>Estimated Nutrition</h3>
            <p>🔥 {result.calories} kcal</p>
            <p>💪 {result.protein} g protein</p>
            <p>🍞 {result.carbs} g carbs</p>
            <p>🧪 {result.vitamins}</p>
            <p>🪨 {result.minerals}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadFood;
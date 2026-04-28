import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/uploadFood.css";

function UploadFood() {
  const [foodName, setFoodName] = useState("");
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

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

  const saveFood = async () => {
    if (!result) {
      alert("Analyze first!");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const foodData = {
      name: foodName || "Food",
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      date: today,
      username
    };

    try {
      const res = await fetch("http://localhost:8080/api/food/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData)
      });

      alert(await res.text());

      setFoodName("");
      setPreview(null);
      setResult(null);

    } catch {
      alert("Error saving food 😢");
    }
  };

  return (
    <div className="upload-wrapper">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <div className="upload-container">

        {/* LEFT */}
        <div className="upload-card">

          <h2>📤 Upload Food</h2>
          <p className="subtitle">Track your meals and nutrition</p>

          <div className="form-grid">

            <div className="input-group">
              <label>🍽 Food Name</label>
              <input
                type="text"
                placeholder="e.g. Paneer Curry"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>📷 Upload Image</label>
              <input type="file" onChange={handleImage} />
            </div>

          </div>

          {preview && <img src={preview} alt="preview" className="preview" />}

          <div className="btn-group">
            <button className="analyze" onClick={analyzeFood}>Analyze</button>
            <button className="save" onClick={saveFood}>Save</button>
          </div>

          {result && (
            <div className="result-card">
              <h3>Nutrition Result</h3>
              <p>🔥 {result.calories} kcal</p>
              <p>💪 {result.protein} g protein</p>
              <p>🍞 {result.carbs} g carbs</p>
              <p>🧪 {result.vitamins}</p>
              <p>🪨 {result.minerals}</p>
            </div>
          )}

          {/* POPULAR */}
          <div className="popular">
            <h3>🍱 Popular Foods</h3>

            <div className="food-list">
              <div><span>🥚 Egg</span> <b>13g</b></div>
              <div><span>🥛 Milk</span> <b>8g</b></div>
              <div><span>🫘 Lentils</span> <b>9g</b></div>
              <div><span>🧀 Paneer</span> <b>11g</b></div>
              <div><span>🐟 Fish</span> <b>22g</b></div>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="tips-card">

          <h3>✨ Quick Tips</h3>

          <div className="tip">
            🎯 <b>Be Accurate</b>
            <p>Use proper measurements</p>
          </div>

          <div className="tip">
            🏷 <b>Use Labels</b>
            <p>Check packaged food info</p>
          </div>

          <div className="tip">
            📊 <b>Track Daily</b>
            <p>Consistency gives better results</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default UploadFood;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/reports.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function Reports() {

  const [data, setData] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // ✅ FETCH FOOD
      const foodRes = await fetch(`http://localhost:8080/api/food/user/${username}`);
      const foods = await foodRes.json();

      // ✅ FETCH WATER
      const waterRes = await fetch(`http://localhost:8080/api/water/user/${username}`);
      const waterData = await waterRes.json();

      // 🔥 GROUP BY DATE
      const grouped = {};

      // FOOD DATA
      foods.forEach(f => {
        const date = f.date?.split("T")[0]; // FIX DATE FORMAT

        if (!grouped[date]) {
          grouped[date] = {
            date,
            calories: 0,
            protein: 0,
            carbs: 0,
            water: 0
          };
        }

        grouped[date].calories += f.calories || 0;
        grouped[date].protein += f.protein || 0;
        grouped[date].carbs += f.carbs || 0;
      });

      // WATER DATA
      waterData.forEach(w => {
        const date = w.date?.split("T")[0];

        if (!grouped[date]) {
          grouped[date] = {
            date,
            calories: 0,
            protein: 0,
            carbs: 0,
            water: 0
          };
        }

        grouped[date].water += w.amount || 0;
      });

      // 🔥 CONVERT TO ARRAY
      let chartData = Object.values(grouped);

      // 🔥 SORT BY DATE (LATEST LAST)
      chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

      // 🔥 OPTIONAL: LAST 7 DAYS ONLY
      chartData = chartData.slice(-7);

      setData(chartData);

      console.log("GRAPH DATA:", chartData);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="reports-container">

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
      <div className="reports-main">

        <h2>📊 Daily Nutrition Report</h2>

        <div className="chart-card">

          {data.length === 0 ? (
            <p>No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="calories" fill="#ff6b6b" />
                <Bar dataKey="carbs" fill="#ffa502" />
                <Bar dataKey="protein" fill="#1e90ff" />
                <Bar dataKey="water" fill="#00a8ff" />

              </BarChart>
            </ResponsiveContainer>
          )}

        </div>

      </div>

    </div>
  );
}

export default Reports;
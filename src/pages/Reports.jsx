import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/reports.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

function Reports() {

  const [data, setData] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const foodRes = await fetch(`http://localhost:8080/api/food/user/${username}`);
      const foods = await foodRes.json();

      const grouped = {};

      foods.forEach(f => {
        const date = f.date?.split("T")[0];

        if (!grouped[date]) {
          grouped[date] = { date, calories: 0, protein: 0, carbs: 0 };
        }

        grouped[date].calories += f.calories || 0;
        grouped[date].protein += f.protein || 0;
        grouped[date].carbs += f.carbs || 0;
      });

      let chartData = Object.values(grouped);
      chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
      chartData = chartData.slice(-7);

      setData(chartData);

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // 🔥 PIE DATA
  const pieData = [
    { name: "Protein", value: 25 },
    { name: "Carbs", value: 45 },
    { name: "Fats", value: 20 },
    { name: "Fiber", value: 10 }
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

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
          <li className="active">📊 Reports</li>
          <li><Link to="/daily">📅 Daily</Link></li>
          <li><Link to="/water">💧 Water</Link></li>
          <li><Link to="/diet">🥗 Diet</Link></li>
          <li><Link to="/chat">🤖 Chat</Link></li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="reports-main">

        <h2>📊 Nutrition Reports</h2>
        <p>Analyze your nutrition trends and progress</p>

        {data.length === 0 ? (
          <p>No data available (Add food first)</p>
        ) : (
          <div className="grid">

            {/* BAR */}
            <div className="card">
              <h3>Weekly Calories</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* LINE */}
            <div className="card">
              <h3>Protein Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="protein" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* PIE */}
            <div className="card">
              <h3>Nutrient Distribution</h3>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={90}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* 🔥 LEGEND */}
              <div className="legend">
                {pieData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: COLORS[index] }}
                    ></span>
                    {item.name} ({item.value}%)
                  </div>
                ))}
              </div>
            </div>

            {/* AREA */}
            <div className="card">
              <h3>Daily Progress</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="calories"
                    stroke="#f59e0b"
                    fill="#fbbf24"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Reports;
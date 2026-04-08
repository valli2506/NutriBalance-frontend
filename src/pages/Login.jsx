import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");   // ✅ FIX
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password
        })
      });

      const result = await response.text();

      if (result.includes("successful")) {

        // ✅ store username
        localStorage.setItem("username", username);

        navigate("/dashboard");

      } else {
        alert("Invalid credentials ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">
        <h1>Welcome Back 👋</h1>
        <p className="tagline">
          Continue your journey towards a healthier life
        </p>

        <div className="features">
          <div className="feature">📊 Track your daily nutrition progress</div>
          <div className="feature">🥗 Maintain a balanced diet</div>
          <div className="feature">🤖 Get AI-powered health insights</div>
          <div className="feature">❤️ Improve your lifestyle habits</div>
        </div>
      </div>

      <div className="auth-right">

        <div className="auth-form">

          <h2>Login to Your Account</h2>

          <input
            type="text"   // 🔥 FIXED
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p>
            Don't have an account? <a href="/signup">Signup</a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;